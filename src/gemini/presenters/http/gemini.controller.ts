import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { fileValidatorPipe } from 'src/pipes/file-validator.pipe';

@Controller('gemini')
export class GeminiController {
  constructor(private service: GeminiService) {}

  @Post('text')
  generateText(@Body() dto: any): Promise<any> {
    return this.service.generateText(dto.prompt);
  }
  
  @Post('text-and-image')
  @UseInterceptors(FileInterceptor('file'))
  async generateTextFromMultiModal(
    @Body() dto: any,
    @UploadedFile(fileValidatorPipe)
    file: Express.Multer.File,
  ): Promise<any> {
    return this.service.generateTextFromMultiModal(dto.prompt, file);
  }

  @Post('analyse-the-images')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'first', maxCount: 1 },
      { name: 'second', maxCount: 1 },
    ]),
  )
  async analyseImages(
    @Body() dto: any,
    @UploadedFiles()
    files: {
      first?: Express.Multer.File[];
      second?: Express.Multer.File[];
    },
  ): Promise<any> {
    if (!files.first?.length) {
      throw new BadRequestException('The first image is missing');
    }

    if (!files.second?.length) {
      throw new BadRequestException('The second image is missing');
    }
    return this.service.analyzeImages({
      prompt: dto.prompt,
      firstImage: files.first[0],
      secondImage: files.second[0],
    });
  }
}
