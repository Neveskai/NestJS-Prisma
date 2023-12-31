import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/config/prisma/prisma.service'
import { Post, Prisma } from '@prisma/client'
import { findPosts, updatePost } from './models'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async posts(params: findPosts): Promise<Post[]> {
    return this.prisma.post.findMany(params)
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data })
  }

  async updatePost(params: updatePost): Promise<Post> {
    return this.prisma.post.update(params)
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where })
  }
}
