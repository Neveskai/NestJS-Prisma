import { Prisma } from '@prisma/client'

export type findUsers = {
  skip?: number
  take?: number
  cursor?: Prisma.UserWhereUniqueInput
  where?: Prisma.UserWhereInput
  orderBy?: Prisma.UserOrderByWithRelationInput
  select?: Prisma.UserSelect
}

export type updateUser = {
  where: Prisma.UserWhereUniqueInput
  data: Prisma.UserUpdateInput
}
