import { Module } from '@nestjs/common'
import { HealthCheckService } from './healthCheck.service'
import { HealthCheckController } from './healthCheck.controller'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
