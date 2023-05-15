import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from './config/config.module';
import { ProvidersModule } from '@lib/providers';
import { MainModule } from './main/main.module';

@Module({
  imports: [ContractModule, ConfigModule, ProvidersModule, MainModule],
})
export class AppModule {}
