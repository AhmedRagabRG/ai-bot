import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from './constant/gemini.constant';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from 'src/config/gemini.config';

export const GeminiProModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI('AIzaSyCumrBMbLwCVLqR-TR8RtSeRR48WesUTaA');
    return genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // generationConfig: GENERATION_CONFIG,
      // safetySettings: SAFETY_SETTINGS,
    });
  },
};

export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_VISION_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI('AIzaSyCumrBMbLwCVLqR-TR8RtSeRR48WesUTaA');
    return genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // generationConfig: GENERATION_CONFIG,
      // safetySettings: SAFETY_SETTINGS,
    });
  },
};