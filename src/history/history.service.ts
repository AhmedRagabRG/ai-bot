import { Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HistoryService {
  history: Content[] = [];

  constructor(private databaseService: DatabaseService) {}

  handleHistory(role: string, text: string) {
    this.history.push({
      role: role,
      parts: [{ text: text }],
    });
  }

  async getHistory(findInd: {}): Promise<Content[]> {
    this.history = [];
    const saved_history = await this.databaseService.history.findMany({
      where: findInd,
    });

    saved_history.forEach((element) => {
      this.handleHistory(element.role, element.text);
    });

    return this.history;
  }
}
