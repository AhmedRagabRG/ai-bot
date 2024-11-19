import { Module } from '@nestjs/common';
import { GeminiController } from './presenters/http/gemini.controller';
import { GeminiService } from './application/gemini.service';
import { GeminiProModelProvider, GeminiProVisionModelProvider } from './gemini.provider';

@Module({
  controllers: [GeminiController],
  providers: [
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
    GeminiService
  ],
  exports: [
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
    GeminiService
  ],
})
export class GeminiModule {}
