import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract,Review,Follower, User, Material, ContractMaterial, Worker } from '@lib/models';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
	imports: [ConfigModule, SequelizeModule.forFeature([Contract, Review,Follower, User, Material, ContractMaterial, Worker])],
	controllers: [ContractController],
	providers: [ContractService]
})
export class ContractModule {}
