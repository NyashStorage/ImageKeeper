import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from 'database';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dao/requests/create-user.request';
import { PrismaService } from '../prisma/prisma.service';

export const DEFAULT_USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  email: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * @throws HttpException An account with same email already registered.
   */
  async create(
    createUserRequest: CreateUserRequest,
    additionalUserSelectFields: Prisma.UserSelect = {},
  ): Promise<User> {
    const { email, password } = createUserRequest;

    if ((await this.find({ email })) !== null)
      throw new HttpException(
        `An account with email "${email}" already registered.`,
        HttpStatus.FORBIDDEN,
      );

    return await this.prismaService.user.create({
      data: {
        ...createUserRequest,
        password: await bcrypt.hash(password, 12),
      },
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
    });
  }

  /**
   * @param query
   * @param additionalUserSelectFields
   * @param throwException Whether to throw an exception if user is not found.
   * @throws HttpException An account with such credentials was not found.
   */
  async find(
    query: Prisma.UserWhereInput,
    additionalUserSelectFields: Prisma.UserSelect = {},
    throwException: boolean = false,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      select: {
        ...DEFAULT_USER_SELECT_FIELDS,
        ...additionalUserSelectFields,
      },
      where: query,
    });

    if (throwException && user === null)
      throw new HttpException(
        'An account with such credentials was not found.',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }
}
