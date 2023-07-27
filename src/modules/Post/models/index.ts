import { Prisma } from '@prisma/client'

export type findPosts = {
  skip?: number
  take?: number
  cursor?: Prisma.PostWhereUniqueInput
  where?: Prisma.PostWhereInput
  orderBy?: Prisma.PostOrderByWithRelationInput
}

export type updatePost = {
  where: Prisma.PostWhereUniqueInput
  data: Prisma.PostUpdateInput
}
