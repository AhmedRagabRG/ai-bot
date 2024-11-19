import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { BotModule } from './discord/discord.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GeminiModule,
    BotModule,
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
