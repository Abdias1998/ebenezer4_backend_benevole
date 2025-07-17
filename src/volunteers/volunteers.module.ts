import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import { Volunteer, VolunteerSchema } from './schemas/volunteer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Volunteer.name, schema: VolunteerSchema }
    ])
  ],
  controllers: [VolunteersController],
  providers: [VolunteersService],
  exports: [VolunteersService],
})
export class VolunteersModule {}