import { Global, Module } from '@nestjs/common'

import { HttpClientService } from './httpClient.service'

@Global()
@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
