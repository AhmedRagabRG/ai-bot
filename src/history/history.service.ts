import { Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HistoryService {
  history: Content[] = [];

  constructor(private databaseService: DatabaseService) {}

  async saveHistory(chatId: string, userId: string, history: any) {
    const handledHistoryData = [];

    history.forEach((ele) => {
      handledHistoryData.push({
        userId: userId,
        chatId: chatId,
        role: ele.role,
        text: ele.text,
      });
    });

    try {
      await this.databaseService.history.createMany({
        data: handledHistoryData,
      });
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  async getHistory(findInd: any): Promise<Content[]> {
    const handledHistoryData = [];
    const chatHistory = await this.databaseService.history.findMany({
      where: findInd,
    });
    chatHistory.forEach((ele) => {
      handledHistoryData.push({
        role: ele.role,
        parts: [{ text: ele.text }],
      });
    });
    return handledHistoryData;
  }
}
