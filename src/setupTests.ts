jest.mock('src/config/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {
    user = {
      create: ({ data: userInput }: any) => ({
        ...userInput,
        id: 1,
        posts: userInput?.posts?.create[0],
      }),
    }
  },
}))
