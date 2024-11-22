import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async authenticate(userInput): Promise<any> {
    const user = await this.validateUser(userInput.email, userInput.password);
    if (!user) throw new UnauthorizedException();

    return this.signIn(user);
  }

  async signIn(user: User): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload);
    return {
      user: {
        access_token: token,
        userId: user.id,
        email: user.email,
      },
    };
  }

  async register(_data: RegisterDto): Promise<any> {
    const { email, name, password, phone } = _data;
    const testUser = await this.usersService.findOne({ email });
    if (testUser) throw new ConflictException('Email already exists');

    const createdUser = await this.usersService.createUser({
      email,
      name,
      password,
      phone,
    });
    return this.signIn(createdUser);
  }
}
