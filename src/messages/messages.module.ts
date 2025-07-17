import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { VolunteersModule } from '../volunteers/volunteers.module';

@Module({
  imports: [VolunteersModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}