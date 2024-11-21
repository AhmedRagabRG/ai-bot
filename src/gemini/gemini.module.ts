import { Module } from '@nestjs/common';
import { GeminiProModelProvider, GeminiProVisionModelProvider } from './gemini.provider';
import { GeminiService } from './application/gemini.service';

@Module({
  providers: [
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
    GeminiService,
  ],
  exports: [
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
    GeminiService
  ],
  imports: []
})
export class GeminiModule {}

