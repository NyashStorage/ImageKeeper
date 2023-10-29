import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesController } from './files.controller';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
