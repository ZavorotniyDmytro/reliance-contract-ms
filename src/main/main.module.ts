import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const MainService = {
   provide: 'MAIN_SERVICE',
   useFactory: (configService: ConfigService) => {
		const user = configService.get('RABBITMQ_DEFAULT_USER')
		const password = configService.get('RABBITMQ_DEFAULT_PASS')
		const host = configService.get('RABBITMQ_HOST')
		const queue = configService.get('RABBITMQ_QUEUE_NAME_MAIN')

		return ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
			  urls: [`amqp://${user}:${password}@${host}`],
			  queue: queue,
			  queueOptions: {
				 durable: true,
			  },
			},
		 })
	},
   inject: [ConfigService],
	imports: [ConfigModule]   
}

@Module({
	imports: [ConfigModule],
	providers: [MainService],
	exports: [MainService]
})
export class MainModule {}
