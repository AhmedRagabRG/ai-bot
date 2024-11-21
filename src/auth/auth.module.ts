import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './stratiges/local.strategy';
import { LocalAuthGuard } from './guards/passport-local.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratiges/jwt.startegy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "testsecret",
      signOptions: { expiresIn: '5m' },
    }),
    PassportModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
