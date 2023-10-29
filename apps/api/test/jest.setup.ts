import * as request from 'supertest';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanupS3, fillDatabase } from './utils/helpers/test.helpers';

export let httpClient: request.SuperAgentTest;
export let app: INestApplication;

global.beforeAll(async () => {
  try {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();

    // Global Nest objects.
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    // Starting.
    await app.init();
    httpClient = request.agent(app.getHttpServer());
  } catch (err) {
    console.error('<!Jest setup error>\n', err);
  }
});

global.afterAll(async () => {
  await cleanupS3(app.get<ConfigService>(ConfigService));

  await app.close();
});

global.beforeEach(async () => {
  const prisma: PrismaService = app.get<PrismaService>(PrismaService);
  const config: ConfigService = app.get<ConfigService>(ConfigService);

  await fillDatabase(prisma, config);
});
