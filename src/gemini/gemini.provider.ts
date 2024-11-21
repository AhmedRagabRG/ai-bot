import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from './constant/gemini.constant';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from 'src/config/gemini.config';
import { ConfigService } from '@nestjs/config';

export const GeminiProModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_MODEL,
  inject: [ConfigService],
  useFactory: (configuration: ConfigService) => {
    const genAI = new GoogleGenerativeAI(configuration.get('GEMINI_API_KEY'));
    return genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};

export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_VISION_MODEL,
  inject: [ConfigService],
  useFactory: (configuration: ConfigService) => {
    const genAI = new GoogleGenerativeAI(configuration.get('GEMINI_API_KEY'));
    return genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};