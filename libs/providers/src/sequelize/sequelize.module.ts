import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule as GlobalSequelizeModule } from '@nestjs/sequelize';

import { Resume, Review, Role, UserRole, UserChat, User, Follower, Chat, Message, Announcement, Contract, ContractMaterial, Material, Worker } from '@lib/models';


@Module({
	imports: [ConfigModule.forRoot({
		envFilePath: ['./libs/providers/.env'],
	}),
	GlobalSequelizeModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory:  (configService: ConfigService) => ({
			dialect: 'postgres',
			host: configService.get<string>('POSTGRES_HOST'),
			port: configService.get<number>('POSTGRES_PORT'),
			username: configService.get<string>('POSTGRES_USER'),
			password: configService.get<string>('POSTGRES_PASSWORD'),
			database: configService.get<string>('POSTGRES_DB'),
			models: [
				Announcement, 
				Chat, Message, 
				Contract, ContractMaterial,
				Follower, 
				Material, 
				Resume, 
				Review, 
				Role, 
				UserRole, UserChat, User, Worker	],
			autoLoadModels: true,
			synchronize: true,
		})
	}),]
})
export class SequelizeModule {}