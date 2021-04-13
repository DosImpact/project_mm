import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsumerModule } from './consumer/consumer.module';

const applicationServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({ credentials: true, origin: '*' });
  await app.listen(process.env.PORT || 4000);
};

async function consumerServer() {
  // const consumer = await NestFactory.create(ConsumerModule);
  // consumer.enableCors({ credentials: true, origin: '*' });
  // await consumer.listen(null || 4001);
}
async function DAServer() {}

async function bootstrap() {
  await Promise.all([applicationServer(), consumerServer(), DAServer()]);
}
bootstrap();
