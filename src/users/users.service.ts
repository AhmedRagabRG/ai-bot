import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(
    find: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.databaseService.user.findUnique({
        where: find,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.databaseService.user.create({
      data,
    });
  }
}
