import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "testsecret",
      signOptions: { expiresIn: '5m' },
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
