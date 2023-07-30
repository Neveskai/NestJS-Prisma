import { Injectable } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheckError,
  HealthCheckService as HealthCheck,
  HealthIndicator,
  HealthIndicatorResult,
  MemoryHealthIndicator,
} from '@nestjs/terminus'

import { PrismaService } from '@/config/prisma/prisma.service'

@Injectable()
export class HealthCheckService extends HealthIndicator {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly health: HealthCheck,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {
    super()
  }

  async dbHealth(): Promise<HealthIndicatorResult> {
    const retrieveData = await this.prismaService.user.findMany({ take: 1 })
    const isHealthy = !!retrieveData
    const result = this.getStatus('db check', isHealthy)

    if (!isHealthy) throw new HealthCheckError('db check failed', result)

    return result
  }

  async check() {
    const health = this.health
    const memory = this.memory
    const disk = this.disk

    return health.check([
      async () => this.dbHealth(),
      async () => memory.checkHeap('memory heap', 200 * 1024 * 1024),
      async () => memory.checkRSS('memory rss', 3000 * 1024 * 1024),
      async () =>
        disk.checkStorage('disk health', {
          threshold: 250 * 1024 * 1024 * 1024,
          path: '/',
        }),
    ])
  }
}
