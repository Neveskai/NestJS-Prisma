import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
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
      email: 'TestUnit@gmail.com',
      name: 'TestUnit',
      posts: {
        create: [
          {
            title: 'Testing',
            content: 'TestingContent',
          },
        ],
      },
    }

    const testUser = await userService.findOne({ email: newUser.email })
    if (testUser) await userService.deleteUser({ email: newUser.email })

    const validatedValue = await validation.transform(newUser, metadata)
    const returnValue = await userController.createUser(validatedValue)

    expect(validatedValue).toBeInstanceOf(CreateUserDto)
    expect(returnValue).toEqual({
      ...newUser,
      id: returnValue.id,
      posts: undefined,
    })

    await userService.deleteUser({ id: returnValue.id })
  })
})
