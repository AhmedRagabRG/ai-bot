import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator';

@Controller('')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AtGuard)
  @Post('chat/create')
  createChat(@GetCurrentUserId(ParseUUIDPipe) userId: string, @Body('chatName') chatName: string): any {
    return this.chatService.createChat(chatName, userId);
  }

  @Post('chat/:chatId')
  @UseGuards(AtGuard)
  generateText(
    @GetCurrentUserId(ParseUUIDPipe) userId: string,
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @Body('prompt') prompt: string,
  ): any {
    return this.chatService.generateText(userId, chatId, prompt);
  }

  // @Post('chats')
  // @UseGuards(AtGuard)
  // getUserChats(@Body() dto: any): any {
  //   return this.chatService.allChats(dto.uid);
  // }

  // @Get('chat/:uid')
  // @UseGuards(AtGuard)
  // getChat(@Param() params): any {
  //   return this.chatService.getChat(params.uid);
  // }
}
