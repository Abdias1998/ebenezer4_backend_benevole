import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'admin' })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);