import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	await app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.TCP,
		options: {
			host: configService.get<string>('CONTRACT_SERVICE_HOST'),
			port: configService.get<number>('CONTRACT_SERVICE_PORT'),
		},
	});
	
	app.startAllMicroservices();
	const PORT = configService.get<number>('PORT')
	app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))
}
bootstrap();
