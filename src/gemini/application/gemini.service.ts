import { GenerativeModel } from '@google/generative-ai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createContent } from 'src/helper/content.helper';
import {
  GEMINI_PRO_MODEL,
  GEMINI_PRO_VISION_MODEL,
} from '../constant/gemini.constant';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_PRO_MODEL) private readonly proModel: GenerativeModel,
    @Inject(GEMINI_PRO_VISION_MODEL)
    private readonly proVisionModel: GenerativeModel,
  ) {}

  async generateText(prompt: string): Promise<any> {
    const contents = createContent(prompt);

    const { totalTokens } = await this.proModel.countTokens({ contents });
    console.log(totalTokens);
    const result = await this.proModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    return { totalTokens, text };
  }

  async generateTextFromMultiModal(
    prompt: string,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const contents = createContent(prompt, file);

      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      const result = await this.proVisionModel.generateContent({ contents });
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
    try {
      const contents = createContent(prompt, firstImage, secondImage);

      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      const result = await this.proVisionModel.generateContent({ contents });
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
}
