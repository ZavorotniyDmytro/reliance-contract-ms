import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from './config/config.module';
import { ProvidersModule } from '@lib/providers';

@Module({
  imports: [ContractModule, ConfigModule, ProvidersModule],
})
export class AppModule {}
