import { GenerativeModel } from '@google/generative-ai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createContent, createTextContent } from 'src/helper/content.helper';
import { GEMINI_PRO_MODEL } from '../constant/gemini.constant';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_PRO_MODEL) private readonly genAI: GenerativeModel,
  ) {}

  async generateText(prompt: string): Promise<any> {
    console.log(prompt);
    const contents = await createTextContent(prompt);
    const { totalTokens } = await this.genAI.countTokens({ contents });
    const result = await this.genAI.generateContent({ contents });
    const response = await result.response;
    const text = response.text();
    
    return { totalTokens, text };
  }

  async startChat(prompt: string) {
    console.log('started chat');
    const chat = await this.genAI.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "my name is ahmed" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
    console.log('footer');
    let result = await chat.sendMessage(prompt);
    console.log('footer2');
    const response = await result.response;
    const text = response.text();
    
    return text
  }

  async generateTextFromMultiModalUrl(
    prompt: string,
    file: string,
  ): Promise<any> {
    try {
      const contents = await createContent(prompt, file);
      const { totalTokens } = await this.genAI.countTokens({
        contents,
      });
      
      const result = await this.genAI.generateContent({ contents });

      const response = await result.response;
      const text = response.text();

      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }

  async analyzeImages({ prompt, firstImage, secondImage }: any): Promise<any> {
    // try {
    //   const contents = createContent(prompt, firstImage, secondImage);

    //   const { totalTokens } = await this.proVisionModel.countTokens({
    //     contents,
    //   });
    //   const result = await this.proVisionModel.generateContent({ contents });
    //   const response = await result.response;
    //   const text = response.text();

    //   return { totalTokens, text };
    // } catch (err) {
    //   if (err instanceof Error) {
    //     throw new InternalServerErrorException(err.message, err.stack);
    //   }
    //   throw err;
    // }
  }
}
