import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { BotModule } from './discord/discord.module';

@Module({
  imports: [
    GeminiModule,
    BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
