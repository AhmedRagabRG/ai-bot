import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { v4 as uuidv4 } from 'uuid';
import { BotService } from 'src/discord/discord.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly discordService: BotService,
  ) {}

  async validateUser(_signInData: SignInDto): Promise<User> {
    try {
      const user: User = await this.usersService.findOne({
        email: _signInData.email,
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      const verifyPassword: boolean = await bcrypt.compare(
        _signInData.password,
        user.password,
      );
      if (!verifyPassword)
        throw new UnauthorizedException('Invalid credentials');
      const { ...result } = user;
      return result;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async register(_registerData: RegisterDto): Promise<any> {
    const { email, fullName, password, phoneNumber } = _registerData;
    try {
      const emailInUse: User | null = await this.usersService.findOne({
        email,
      });
      if (emailInUse) throw new ConflictException('Email already exists');

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const uid: string = uuidv4();
      const checkId: User | null = await this.usersService.findOne({ uid });
      if (checkId) throw new Error('try again');
      const createdUser = await this.usersService.createUser({
        uid,
        email,
        fullName,
        password: hashedPassword,
        phoneNumber,
      });

      const tokens = await this.getTokens(createdUser.id, email, fullName, createdUser.tier);
      await this.updateRtHash(tokens.refresh_token, createdUser.uid);

      return {
        ...tokens,
        uid: createdUser.uid,
        email,
        fullName: createdUser.fullName,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(_signInData: SignInDto): Promise<any> {
    const user = await this.validateUser({
      email: _signInData.email,
      password: _signInData.password,
    });
    const tokens = await this.getTokens(user.uid, user.email, user.fullName, user.tier);
    await this.updateRtHash(tokens.refresh_token, user.uid);

    return {
      ...tokens,
      uid: user.uid,
      email: user.email,
      fullName: user.fullName,
    };
  }

  async logout(userId: string): Promise<any> {
    await this.updateRtHash(null, userId);

    return {
      message: 'Logout successfully',
    };
  }

  async refreshTokens(rt: string, userId: string): Promise<any> {
    try {
      const user = await this.usersService.findOne({
        uid: userId,
      });

      if (!user || !user.hashedRt)
        throw new UnauthorizedException('Access Denied');
      const tokenVerify = await bcrypt.compare(rt, user.hashedRt);
      if (!tokenVerify) throw new UnauthorizedException('Access Denied');
      const tokens = await this.getTokens(user.uid, user.email, user.fullName, user.tier);

      await this.updateRtHash(tokens.refresh_token, user.uid);
      return {
        ...tokens,
        uid: user.uid,
        email: user.email,
        fullName: user.fullName,
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async updateRtHash(rt: string, userId: string): Promise<void> {
    let hashedRt: string | null = null;
    if (rt) {
      hashedRt = await bcrypt.hash(rt, 8);
      return
    }
    await this.usersService.updateUserRt(hashedRt, userId);
  }

  async getTokens( userId: string, email: string, displayName: string, tier: string): Promise<Tokens> {
    const jwtPayload = {
      sub: userId,
      email,
      displayName,
      tier,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async discordAuth(profile: any, userId: string): Promise<any> {
    const { id, username, global_name, avatar } = profile;
    const user = await this.usersService.findOne({ uid: userId });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.tier === 'free') throw new UnauthorizedException('Upgrade tier');
    await this.usersService.updateUser(userId, {
      discordId: id,
    });

    return await this.discordService.createUserData({
      userId,
      discordId: id,
      username,
      global_name,
      avatar,
    });
  }
}
