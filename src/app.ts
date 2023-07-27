import { Module, Logger } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/User/user'
import { PostModule } from './modules/Post/post'
import { ThrottlerModule } from '@nestjs/throttler'
import { PrismaModule } from './config/prisma/prisma'
import { HealthCheckModule } from './modules/HealthCheck/healthCheck'

import env from './helpers/env'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    PrismaModule,
    HealthCheckModule,
    UserModule,
    PostModule,
  ],
  providers: [Logger],
})
export class AppModule {}
