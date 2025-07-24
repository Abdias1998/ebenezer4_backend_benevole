import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum VolunteerSection {
  ACCUEIL = 'accueil',
  ORGANISATION = 'organisation',
  SECURITE = 'sécurité',
  STAFF = 'staff',
  TRANSPORT = 'transport',
}

export type VolunteerDocument = Volunteer & Document;

@Schema({ timestamps: true })
export class Volunteer {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  // @Prop({ required: true })
  // denomination: string;

  @Prop({ 
    required: true, 
    enum: Object.values(VolunteerSection) 
  })
  section: VolunteerSection;

  // @Prop({ default: false })
  // isBornAgain: boolean;

  @Prop({ default: Date.now })
  registeredAt: Date;
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);