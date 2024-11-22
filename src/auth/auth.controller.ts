import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/passport-local.guard';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() data: RegisterDto) {
    if (!data) return { message: 'User data is required' };
    return this.authService.register(data);
  }
}
