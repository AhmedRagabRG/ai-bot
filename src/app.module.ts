import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { BotModule } from './discord/discord.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { HistoryService } from './history/history.service';
import { HistoryModule } from './history/history.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GeminiModule,
    BotModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
    ChatModule,
    HistoryModule
  ],
  controllers: [],
  providers: [HistoryService],
})
export class AppModule {}
