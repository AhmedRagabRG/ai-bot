import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private readonly geminiService: GeminiService,
    private readonly usersService: UsersService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user?.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(msg: Message) {
    const { id, bot } = msg.author;
    try {
      if (!bot) {
        this.logger.log(`Received message: ${msg.content}`);
        
        const user = await this.usersService.findOne({discordId: id});
        if (!user) return msg.reply('Your account is not registered. Please register your account first.');

        const attachments = msg.attachments;
        const attachment = attachments.values().next().value;
        const imageUrl = attachment?.url;
        const contentType = attachment?.contentType;

        if (imageUrl && contentType) {
          const response =
            await this.geminiService.generateTextFromMultiModalUrl(
              msg.content,
              {
                url: imageUrl,
                type: contentType,
              },
            );
          msg.reply(response.text);
          return;
        }

        const response = await this.geminiService.startChat(msg.content);
        // msg.reply(response);
      }
    } catch (error) {
      this.logger.error(
        `Error processing message: ${error.message}`,
        error.stack,
      );
    }
  }
}
