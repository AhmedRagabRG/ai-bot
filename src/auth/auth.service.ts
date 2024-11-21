import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.usersService.findOne({ email });
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async authenticate(userInput): Promise<any>{
    const user = await this.validateUser(userInput.email, userInput.password);
    if (!user) throw new UnauthorizedException();

    return this.signIn(user);
  }
  
  async signIn(user: User): Promise<any>{
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload);
    return {
      access_token: token,
      userId: user.id,
      email: user.email
    };
  }
}
