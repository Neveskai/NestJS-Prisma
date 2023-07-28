// @ts-nocheck
import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { prismaMock } from 'src/__tests__/prisma/singleton'
import { AppModule } from 'src/app'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'

describe('User', () => {
  let userController: UserController
  let userService: UserService
  let validation: ValidationPipe

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    userController = moduleRef.get(UserController)
    userService = moduleRef.get(UserService)

    validation = new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  })

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateUserDto,
    data: '',
  }

  it('should create new user', async () => {
    const newUser = {
      email: 'Wendell@gmail.com',
      name: 'Wendell',
      posts: {
        create: [
          {
            title: 'myPost',
            content: 'myFirstPost',
          },
        ],
      },
    }

    prismaMock.user.create.mockResolvedValue(newUser)
    userService.createUser = prismaMock.user.create

    expect(await validation.transform(newUser, metadata)).toBeInstanceOf(CreateUserDto)
    await expect(userController.createUser(newUser)).resolves.toEqual(newUser)
  })
})
