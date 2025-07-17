import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export enum MessageType {
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
}

export class SendMessageDto {
  @IsUUID()
  volunteerId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(MessageType)
  type: MessageType;
}