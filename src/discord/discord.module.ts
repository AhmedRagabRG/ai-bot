import { Module } from '@nestjs/common';
import { BotService } from './discord.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token:'',
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
  providers: [BotService, UsersService],
  exports: [BotService],
})
export class BotModule {}
