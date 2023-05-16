import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const user = configService.get('RABBITMQ_DEFAULT_USER')
	const password = configService.get('RABBITMQ_DEFAULT_PASS')
	const host = configService.get('RABBITMQ_HOST')
	const queue = configService.get('RABBITMQ_QUEUE_NAME_CONTRACT')

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${user}:${password}@${host}`],
			queue: queue,
			queueOptions: {
		   	durable: false,
			},
			noAck: false,
      	prefetchCount: 1,
		},
		
	});
	
	app.startAllMicroservices();
	const PORT = configService.get<number>('PORT')
	app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))
}
bootstrap();
