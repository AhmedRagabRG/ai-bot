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
import { AtGuard } from './common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    HistoryService
  ],
})
export class AppModule {}
