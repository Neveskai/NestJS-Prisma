import { Controller, Get } from '@nestjs/common'

import { HealthCheckService } from './healthCheck.service'
import { HealthCheck } from '@nestjs/terminus'

@Controller('health')
export class HealthCheckController {
  constructor(private readonly healthCheck: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheck.check()
  }
}
