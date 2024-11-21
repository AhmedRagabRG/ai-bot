import { Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { HistoryService } from 'src/history/history.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatService {
  history: Content[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly geminiService: GeminiService,
    private readonly historyService: HistoryService,
    private readonly databaseService: DatabaseService,
  ) {}

  async handleHistory(role: string, text: string) {
    this.historyService.handleHistory(role, text);
  }

  async newChat(name: string) {
    return await this.databaseService.chat.create({
      data: {
        userId: 1,
        name: name,
      },
    });
  }

  async startChat(prompt: string, useMemory: boolean = true) {
    const user = await this.usersService.findOne({
      email: 'ahmed.shoshan@outlook.com',
    });

    if (useMemory) {
      const saved_history = await this.historyService.getHistory({
        chatId: user.id,
      });
      this.history = saved_history;
    }

    this.historyService.handleHistory('user', prompt);
    return this.geminiService.startChat(prompt, this.history);
  }

  async allChats(userId) {
    const chats = await this.databaseService.chat.findMany({
      where: { userId },
    });

    return chats;
  }
 
  async getChat(chatId: number) {
    const chat = await this.historyService.getHistory({ chatId });
    return chat;
  }
}
