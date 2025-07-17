import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('sms')
  @UseGuards(JwtAuthGuard)
  async sendSMS(@Body() sendMessageDto: SendMessageDto) {
    sendMessageDto.type = 'sms' as any;
    return await this.messagesService.sendMessage(sendMessageDto);
  }

  @Post('whatsapp')
  @UseGuards(JwtAuthGuard)
  async sendWhatsApp(@Body() sendMessageDto: SendMessageDto) {
    sendMessageDto.type = 'whatsapp' as any;
    return await this.messagesService.sendMessage(sendMessageDto);
  }

  @Post('email')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendMessageDto: SendMessageDto) {
    sendMessageDto.type = 'email' as any;
    return await this.messagesService.sendMessage(sendMessageDto);
  }
}