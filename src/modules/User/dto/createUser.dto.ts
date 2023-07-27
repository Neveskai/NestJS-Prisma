import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator'
import { User } from '@prisma/client'
import { CreatePostDto } from 'src/modules/Post/dto/createPost.dto'

export class CreateUserDto {
  @IsString()
  name: User['name']

  @IsEmail()
  email: User['email']

  @IsOptional()
  @IsObject()
  posts?: { create: Array<CreatePostDto> }
}
