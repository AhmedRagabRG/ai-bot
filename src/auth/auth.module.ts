import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.startegy';
import { DiscordStrategy } from './strategies/discord.strategy';
import { BotModule } from 'src/discord/discord.module';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '2024-11-22 20:20:12.420cm3t6qz2c0001yv8ffv6h8z09+2024-11-22 20:20:12.420',
    }),
    PassportModule,
    BotModule
  ],
  providers: [AuthService, AtStrategy, RtStrategy, DiscordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
