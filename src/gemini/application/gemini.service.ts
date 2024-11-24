import { GenerativeModel } from '@google/generative-ai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GEMINI_PRO_MODEL } from 'src/gemini/constant/gemini.constant';
import {
  createContent,
  createTextContent,
  IFile,
} from 'src/helper/content.helper';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_PRO_MODEL) private readonly genAI: GenerativeModel,
    // private readonly usersService: UsersService,
  ) {}

  async generateText(prompt: string): Promise<any> {
    const contents = await createTextContent(prompt);
    const { totalTokens } = await this.genAI.countTokens({ contents });
    const result = await this.genAI.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    return { totalTokens, text };
  }

  async startChat(prompt: string, history: any = []) {
    try {
      const contents = await createContent(prompt);
      const chat = await this.genAI.startChat({ history });
      const { totalTokens } = await this.genAI.countTokens({ contents });
      const result = await chat.sendMessage(`${prompt}`);
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

  async generateTextFromMultiModalUrl(
    prompt: string,
    file: IFile,
  ): Promise<any> {
    try {
      const contents = await createContent(prompt, {
        url: file.url,
        type: file.type,
      });
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
