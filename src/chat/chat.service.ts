import { Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { HistoryService } from 'src/history/history.service';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ChatService {
  history: Content[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly geminiService: GeminiService,
    private readonly historyService: HistoryService,
    private readonly databaseService: DatabaseService,
  ) {}

  async createChat(name: string, userId: string) {
    const uid: string = uuidv4();
    try {
      const checkId: Chat = await this.databaseService.chat.findUnique({
        where: { id: uid },
      });
      if (checkId) throw new Error('try again');
      return await this.databaseService.chat.create({
        data: {
          id: uid,
          ownerId: userId,
          name,
        },
      });
    } catch (err) {
      throw new Error('try again');
    }
  }

  async generateText(userId: string, chatId: string, prompt: string) {
    try {
      const chatHistory = await this.historyService.getHistory({ chatId });
      const modelAnswer = await this.geminiService.startChat(
        prompt,
        chatHistory,
      );
      if (!modelAnswer) throw new Error('try again');
      this.historyService.saveHistory(chatId, userId, [
        {
          role: 'user',
          text: prompt,
        },
        {
          role: 'model',
          text: modelAnswer.text,
        },
      ]);

      return {
        prompt,
        modelAnswer,
      };
    } catch (err) {
      throw new Error('try again');
    }
  }

  async findUserChats(userId: string): Promise<Chat[]> {
    const chats: Chat[] = await this.databaseService.chat.findMany({
      where: { ownerId: userId },
    });

    return chats;
  }

  async getChat(chatId: string) {
    const chat = await this.historyService.getHistory({ chatId });
    return chat;
  }
}
