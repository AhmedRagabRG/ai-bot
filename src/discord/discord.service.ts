import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { GeminiService } from 'src/gemini/application/gemini.service';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private readonly geminiService: GeminiService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user?.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(msg: Message) {
    try {
      if (!msg.author.bot) {
        this.logger.log(`Received message: ${msg.content}`);

        const attachments = msg.attachments;
        const attachment = attachments.values().next().value;
        const imageUrl = attachment?.url;

        if (imageUrl) {
          const response =
            await this.geminiService.generateTextFromMultiModalUrl(
              msg.content,
              imageUrl,
            );
          msg.reply(response.text);
          return;
        }

        const response = await this.geminiService.startChat(msg.content);
        console.log(response)
        msg.reply(response);
      }
    } catch (error) {
      this.logger.error(
        `Error processing message: ${error.message}`,
        error.stack,
      );
    }
  }
}
