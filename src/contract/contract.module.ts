import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract,Review,Follower, User, Material, ContractMaterial, Worker } from '@lib/models';
import { MainModule } from 'src/main/main.module';


@Module({
	imports: [MainModule, SequelizeModule.forFeature([Contract, Review,Follower, User, Material, ContractMaterial, Worker])],
	controllers: [ContractController],
	providers: [
		ContractService,
	]
})
export class ContractModule {}
