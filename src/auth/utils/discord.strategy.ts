import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        clientID: 'id',
        clientSecret: 'secret',
        callbackURL: 'callbackURL',
        scope: ['identify', 'email'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
