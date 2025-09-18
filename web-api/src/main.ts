import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedWebUiUrls = (process.env.WEB_UI ?? '').split(';');
  console.log(allowedWebUiUrls);

  app.enableCors({
    origin: allowedWebUiUrls,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  const config = new DocumentBuilder()
    .setTitle('Users duel API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documentFactory, {
    customSiteTitle: 'Users due API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('Application was started under 3000 port');
}

void (async () => {
  await bootstrap();
})();
