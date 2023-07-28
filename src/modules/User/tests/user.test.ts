// @ts-nocheck
import { Test } from '@nestjs/testing'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { prismaMock } from '../../../singleton'
import { PrismaModule } from 'src/config/prisma/prisma'
import { ConfigModule } from '@nestjs/config'

import env from 'src/config/env'
import { CacheModule } from '@nestjs/cache-manager'

describe('User', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [env],
        }),
        CacheModule.register({
          ttl: 5 * 1000,
          max: 5,
        }),
        PrismaModule,
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile()

    userController = moduleRef.get(UserController)
    userService = moduleRef.get(UserService)
  })

  it('should create new user ', async () => {
    const newUser = {
      email: 'Wendell@gmail.com',
      name: 'Wendell',
      posts: {
        create: [
          {
            title: 'myPost',
            content: 'myFirstPost',
          },
          {
            title: 'yourPost',
            content: 'mySecondP',
          },
        ],
      },
    }

    prismaMock.user.create.mockImplementation(() => jest.fn())
    userService.createUser = prismaMock.user.create

    await userController.createUser(newUser)

    expect(userService.createUser).toHaveBeenCalled()
    expect(prismaMock.user.create).toHaveBeenCalled()
  })
})
