import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { VolunteerSection } from './schemas/volunteer.schema';

@Controller('api/volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    const volunteer = await this.volunteersService.create(createVolunteerDto);
    return {
      success: true,
      message: 'Bénévole inscrit avec succès',
      data: volunteer,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('section') section?: VolunteerSection) {
    const volunteers = await this.volunteersService.findAll(section);
    return {
      success: true,
      data: volunteers,
    };
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  async getStatistics() {
    const stats = await this.volunteersService.getStatistics();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const volunteer = await this.volunteersService.findOne(id);
    return {
      success: true,
      data: volunteer,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.volunteersService.remove(id);
    return {
      success: true,
      message: 'Bénévole supprimé avec succès',
    };
  }
}