import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'
import { Post } from '@prisma/client'

export class CreatePostDto {
  @IsString()
  title: Post['title']

  @IsString()
  content: Post['content']

  @IsEmail()
  authorEmail: string

  @IsOptional()
  @IsBoolean()
  published?: Post['published']
}
