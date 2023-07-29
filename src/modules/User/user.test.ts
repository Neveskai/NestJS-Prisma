import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { AppModule } from 'src/app'

describe('User', () => {
  let userController: UserController
  let validation: ValidationPipe

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    userController = moduleRef.get(UserController)

    validation = new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  })

  const createUserMetadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateUserDto,
    data: '',
  }

  it('should create new user', async () => {
    const userInput: CreateUserDto = {
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

    const validatedValue = await validation.transform(userInput, createUserMetadata)
    const returnValue = await userController.createUser(validatedValue)

    expect(validatedValue).toBeInstanceOf(CreateUserDto)
    expect(returnValue).toMatchObject({
      ...validatedValue,
      id: 1,
      posts: userInput?.posts?.create[0],
    })
  })
})
