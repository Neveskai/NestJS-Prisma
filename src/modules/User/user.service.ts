import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/config/prisma/prisma.service'
import { User, Prisma } from '@prisma/client'
import { findUsers, updateUser } from './models'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where })
  }

  async findUsers({ fields }): Promise<User[]> {
    const query: findUsers = {
      select: fields,
    }

    return this.prisma.user.findMany(query)
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data, include: { posts: !!data?.posts?.create } })
  }

  async updateUser(params: updateUser): Promise<User> {
    return this.prisma.user.update(params)
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }
}
