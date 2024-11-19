import { Module } from '@nestjs/common';
import { BotService } from './discord.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { DiscordModule } from '@discord-nestjs/core';
import { GeminiProModelProvider } from 'src/gemini/gemini.provider';
import { GatewayIntentBits, Partials } from 'discord.js';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token:
          'MTMwODE3MDk3NTE0MTAzNjE0Mw.GDVrSq.CvxGD7e3bDLrEl7pFghksuCSIGme8Ip1Xi9-4o',
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
          ],
          partials: [Partials.Channel],
        },
      }),
    }),
    GeminiModule,
  ],
  providers: [BotService],
})
export class BotModule {}
