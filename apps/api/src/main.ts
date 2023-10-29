import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

(async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Basic settings.
    app.setGlobalPrefix('api');
    app.enableCors({
      origin: configService.get('frontend_url') || '*',
      credentials: true,
      exposedHeaders: 'X-Access-Token',
    });

    // Adapters.
    app.use(helmet(), cookieParser());

    // Global Nest objects.
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        strategy: 'excludeAll',
      }),
    );

    // Documentation.
    SwaggerModule.setup(
      'api/docs',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('ImageKeeper documentation')
          .setVersion('1.0.0')
          .addBearerAuth()
          .build(),
      ),
    );

    // Starting.
    await app.listen(configService.get('api_port') || 5200);
  } catch (e: any) {
    Logger.error(
      `Something went wrong when starting application: ${e.message}`,
    );
  }
})();
