import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  UseInterceptors,
  Query,
  ParseArrayPipe,
} from '@nestjs/common'

import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'
import { CreateUserDto } from './dto/createUser.dto'
import { HttpStatusCode } from 'axios'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { FieldsPipe } from '@/helpers/fields.pipe'
import { FindUsersDto } from './dto/findUsers.dto'
import { TransformInterceptor } from '@/helpers/transform.interceptor'

const validFields = ['id', 'name', 'email', 'posts']

@Controller('user')
@UseInterceptors(CacheInterceptor)
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    try {
      return await this.userService.createUser(userData)
    } catch (error) {
      if (error?.meta?.target === 'User_email_key')
        throw new HttpException('Email já cadastrado', HttpStatusCode.Ok)

      throw new HttpException(error, HttpStatusCode.InternalServerError, { cause: error })
    }
  }

  @Get()
  async findAll(
    @Query('fields', ParseArrayPipe, new FieldsPipe(validFields)) fields: FindUsersDto,
  ): Promise<UserModel[]> {
    try {
      return this.userService.findUsers({ fields })
    } catch (error) {
      throw new HttpException(error, HttpStatusCode.InternalServerError, { cause: error })
    }
  }
}
