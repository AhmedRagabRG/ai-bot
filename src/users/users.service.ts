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

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    try {
      const user = await this.databaseService.user.create({
        data: {
          ...data,
        },
      });

      return user
    } catch (err) {
      throw new Error(err);
    }
  }
}
