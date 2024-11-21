// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Post,
//   UploadedFile,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
// import {
//   FileFieldsInterceptor,
//   FileInterceptor,
// } from '@nestjs/platform-express';
// import axios from 'axios';
// import { ChatService } from 'src/chat/chat.service';
// import { GeminiService } from 'src/gemini/application/gemini.service';
// import { fileValidatorPipe } from 'src/pipes/file-validator.pipe';

// @Controller('gemini')
// export class GeminiController {
//   constructor(private chatService: ChatService) {}

//   // @Post('text')
//   // generateText(@Body() dto: any): any {
//   //   return this.chatService.startChat(dto.prompt);
//   // }

//   // @Post('text-and-image')
//   // @UseInterceptors(FileInterceptor('file'))
//   // async generateTextFromMultiModalUrl(
//   //   @Body() dto: any,
//   //   @UploadedFile(fileValidatorPipe)
//   //   fileUrl: string,
//   // ): Promise<any> {
//   //   return this.chatService.generateTextFromMultiModalUrl(dto.prompt, {
//   //     url: fileUrl,
//   //     type: 'image/jpeg',
//   //   });
//   // }

//   @Post('analyse-the-images')
//   @UseInterceptors(
//     FileFieldsInterceptor([
//       { name: 'first', maxCount: 1 },
//       { name: 'second', maxCount: 1 },
//     ]),
//   )
//   async analyseImages(
//     @Body() dto: any,
//     @UploadedFiles()
//     files: {
//       first?: Express.Multer.File[];
//       second?: Express.Multer.File[];
//     },
//   ): Promise<any> {
//     if (!files.first?.length) {
//       throw new BadRequestException('The first image is missing');
//     }

//     if (!files.second?.length) {
//       throw new BadRequestException('The second image is missing');
//     }
//     // return this.service.analyzeImages({
//     //   prompt: dto.prompt,
//     //   firstImage: files.first[0],
//     //   secondImage: files.second[0],
//     // });
//   }
// }
