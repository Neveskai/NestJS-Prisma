import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModule.register({
      ttl: 5 * 1000,
      max: 5,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
