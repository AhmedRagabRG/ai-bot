import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { DiscordAuthGuard } from 'src/common/guards/discord.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { AtGuard } from 'src/common/guards/at.guard';
import { TierGuard } from 'src/common/guards/tier.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInData: SignInDto) {
    return this.authService.login(signInData);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  refreshToken(
    @GetCurrentUser('refreshToken') rt: string,
    @GetCurrentUserId(ParseUUIDPipe) userId: string,
  ) {
    return this.authService.refreshTokens(rt, userId);
  }

  @Get('discord')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard, TierGuard, DiscordAuthGuard)
  discordLogin() {}

  @Get('discord/callback')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AtGuard, TierGuard, DiscordAuthGuard)
  discordCallback(
    @GetCurrentUser() user,
    @GetCurrentUserId(ParseUUIDPipe) userId: string,
  ) {
    this.authService.discordAuth(user, userId);
  }

  @Get('me')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  me(@GetCurrentUser() user) {
    return {
      user,
      MSG: 'User found',
    }
  }
}
