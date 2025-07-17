import { Injectable, NotFoundException } from '@nestjs/common';
import { VolunteersService } from '../volunteers/volunteers.service';
import { SendMessageDto, MessageType } from './dto/send-message.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MessagesService {
  private emailTransporter: nodemailer.Transporter;

  constructor(private volunteersService: VolunteersService) {
    // Configuration du transporteur email (exemple avec Gmail)
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    });
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const volunteer = await this.volunteersService.findOne(sendMessageDto.volunteerId);
    
    if (!volunteer) {
      throw new NotFoundException('Bénévole non trouvé');
    }

    switch (sendMessageDto.type) {
      case MessageType.SMS:
        return await this.sendSMS(volunteer.phone, sendMessageDto.message);
      
      case MessageType.WHATSAPP:
        return await this.sendWhatsApp(volunteer.phone, sendMessageDto.message);
      
      case MessageType.EMAIL:
        return await this.sendEmail(
          `${volunteer.firstName}.${volunteer.lastName}@example.com`,
          sendMessageDto.message,
          volunteer
        );
      
      default:
        throw new Error('Type de message non supporté');
    }
  }

  private async sendSMS(phone: string, message: string) {
    // Simulation d'envoi SMS (intégration Twilio en production)
    console.log(`📱 SMS envoyé à ${phone}: ${message}`);
    
    // En production, utiliser Twilio:
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: message,
    //   from: '+1234567890',
    //   to: phone
    // });

    return {
      success: true,
      message: 'SMS envoyé avec succès',
      details: {
        recipient: phone,
        type: 'sms',
        sentAt: new Date().toISOString(),
      },
    };
  }

  private async sendWhatsApp(phone: string, message: string) {
    // Simulation d'envoi WhatsApp (intégration WhatsApp Business API en production)
    console.log(`💬 WhatsApp envoyé à ${phone}: ${message}`);
    
    // En production, utiliser WhatsApp Business API ou Twilio WhatsApp:
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: message,
    //   from: 'whatsapp:+1234567890',
    //   to: `whatsapp:${phone}`
    // });

    return {
      success: true,
      message: 'Message WhatsApp envoyé avec succès',
      details: {
        recipient: phone,
        type: 'whatsapp',
        sentAt: new Date().toISOString(),
      },
    };
  }

  private async sendEmail(email: string, message: string, volunteer: any) {
    try {
      // Simulation d'envoi email
      console.log(`📧 Email envoyé à ${email}: ${message}`);
      
      // En production, décommenter pour envoyer réellement:
      // await this.emailTransporter.sendMail({
      //   from: process.env.EMAIL_FROM || 'ebenezer4@example.com',
      //   to: email,
      //   subject: 'Message de l\'équipe Ebenezer 4',
      //   html: `
      //     <h2>Bonjour ${volunteer.firstName} ${volunteer.lastName},</h2>
      //     <p>${message}</p>
      //     <br>
      //     <p>Cordialement,<br>L'équipe Ebenezer 4</p>
      //   `,
      // });

      return {
        success: true,
        message: 'Email envoyé avec succès',
        details: {
          recipient: email,
          type: 'email',
          sentAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
  }
}