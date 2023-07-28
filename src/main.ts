import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  })
  const logger = app.get(Logger)
  const env = app.get(ConfigService)
  const port = env.get('port') as number
  const contextPath = env.get('contextPath') as string

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.enableCors()
  app.use(helmet())
  app.enableCors()
  app.enableShutdownHooks()
  app.setGlobalPrefix(contextPath)

  await app.listen(port)

  process.on('beforeExit', async () => {
    await app.close()
  })

  logger.log(`Listening on port ${port}`, 'NestApplication')
}

bootstrap()
