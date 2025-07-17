import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { LoginDto } from './dto/login.dto';

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
}