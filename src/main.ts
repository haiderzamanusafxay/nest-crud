import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Premium Swap API')
    .setDescription('API for Premium Swap App')
    .setVersion('1.0')
    .addTag('sequelize')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9008);
  console.log(`Application is running on: http://localhost:9008`);
}
bootstrap();
