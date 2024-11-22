import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      if (!request.user) throw new UnauthorizedException('User not found');
      request.user.discord = user;
      return request.user.discord;
    }
    catch (error) {
      throw new Error(error.message);
    }
  }
}
