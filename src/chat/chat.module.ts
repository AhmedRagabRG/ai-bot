import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { GeminiModule } from 'src/gemini/gemini.module';
import { UsersModule } from 'src/users/users.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
  imports: [GeminiModule, UsersModule, HistoryModule],
})
export class ChatModule {}
