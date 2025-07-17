import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {
    this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const existingAdmin = await this.adminModel
      .findOne({ username: 'admin' })
      .exec();

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('ebenezer2024', 10);
      const admin = new this.adminModel({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('Default admin created: admin / ebenezer2024');
    }
  }

  async validateAdmin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.adminModel.findOne({ username }).exec();
    
    if (admin && await bcrypt.compare(password, admin.password)) {
      return admin;
    }
    
    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateAdmin(loginDto.username, loginDto.password);
    
    if (!admin) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { 
      sub: admin._id, 
      username: admin.username, 
      role: admin.role 
    };

    return {
      success: true,
      message: 'Connexion réussie',
      data: {
        access_token: this.jwtService.sign(payload),
        admin: {
          id: admin._id,
          username: admin.username,
          role: admin.role,
        },
      },
    };
  }

  async validateToken(payload: any): Promise<Admin> {
    const admin = await this.adminModel.findById(payload.sub).exec();
    
    if (!admin) {
      throw new UnauthorizedException('Token invalide');
    }
    
    return admin;
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>> {
    const { username, password } = createAdminDto;

    const existingAdmin = await this.adminModel.findOne({ username }).exec();
    if (existingAdmin) {
      throw new ConflictException('Un administrateur avec ce nom d\'utilisateur existe déjà');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new this.adminModel({
      username,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = savedAdmin.toObject();
    return result;
  }
}