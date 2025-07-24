import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { VolunteerSection } from '../schemas/volunteer.schema';

export class CreateVolunteerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  // @IsString()
  // @IsNotEmpty()
  // denomination: string;

  @IsEnum(VolunteerSection)
  section: VolunteerSection;

  // @IsBoolean()
  // @IsOptional()
  // isBornAgain?: boolean = false;
}