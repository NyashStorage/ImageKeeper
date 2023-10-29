import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';
import { PrismaService } from '../prisma/prisma.service';
import { FileModel } from './models/file.model';
import { UpdateFileRequest } from './dao/requests/update-file.request';
import { Prisma } from 'database';
import { CreateFileRequest } from './dao/requests/create-file.request';
import { ListFileResponse } from './dao/responses/list-file.response';

export const DEFAULT_FILE_SELECT_FIELDS: Prisma.FileSelect = {
  key: true,
  bucket: true,
  title: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
};

export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 10;

@Injectable()
export class FilesService {
  private readonly s3: S3;
  private readonly bucket_name: string;

  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService,
  ) {
    this.s3 = new S3({
      region: configService.get('aws_region'),
      credentials: {
        accessKeyId: configService.get('aws_access_key'),
        secretAccessKey: configService.get('aws_secret_key'),
      },
    });

    this.bucket_name = configService.get('aws_bucket_name');
  }

  /**
   * Uploads file to AWS S3 and stores data in database.
   * @throws HttpException File not specified.
   */
  async uploadFile(
    data: Buffer,
    mimeType: string,
    createFileRequest: Partial<CreateFileRequest> = {},
    additionalFileSelectFields: Prisma.UserSelect = {},
  ): Promise<FileModel> {
    if (!data)
      throw new HttpException('File not specified.', HttpStatus.BAD_REQUEST);

    const fileType = mime.extension(mimeType);
    const uploadResult = await this.s3
      .upload({
        Key: `${uuid()}.${fileType}`,
        Body: data,
        Bucket: this.bucket_name,
      })
      .promise();

    return await this.prismaService.file.create({
      data: {
        key: uploadResult.Key,
        contentType: mimeType,
        bucket: uploadResult.Bucket,
        ...createFileRequest,
      },
      select: {
        ...DEFAULT_FILE_SELECT_FIELDS,
        ...additionalFileSelectFields,
      },
    });
  }

  async listFiles(
    skip?: number,
    limit?: number,
    query: Prisma.FileWhereInput = {},
    sort: Prisma.FileOrderByWithRelationInput = { createdAt: 'desc' },
    additionalFileSelectFields: Prisma.UserSelect = {},
  ): Promise<FileModel[]> {
    return this.prismaService.file.findMany({
      where: query,
      select: {
        ...DEFAULT_FILE_SELECT_FIELDS,
        ...additionalFileSelectFields,
      },
      skip: isNaN(skip) ? DEFAULT_SKIP : Math.max(+skip, 0),
      take: isNaN(limit) ? DEFAULT_LIMIT : Math.max(+limit, 1),
      orderBy: sort,
    });
  }

  /**
   * @throws HttpException File with such identifier was not found or you are not its owner.
   */
  async updateFile(
    id: string,
    updateFileRequest: UpdateFileRequest,
    userId: string,
    additionalFileSelectFields: Prisma.UserSelect = {},
  ): Promise<FileModel> {
    try {
      return await this.prismaService.file.update({
        data: updateFileRequest,
        where: {
          key: id,
          ownerId: userId,
        },
        select: {
          ...DEFAULT_FILE_SELECT_FIELDS,
          ...additionalFileSelectFields,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        `File with identifier "${id}" was not found or you are not its owner.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Deletes file from AWS S3 and database.
   * @throws HttpException File with such identifier was not found or you are not its owner.
   */
  async deleteFile(
    id: string,
    userId: string,
    additionalFileSelectFields: Prisma.UserSelect = {},
  ): Promise<FileModel> {
    try {
      const file = await this.prismaService.file.delete({
        where: {
          key: id,
          ownerId: userId,
        },
        select: {
          ...DEFAULT_FILE_SELECT_FIELDS,
          ...additionalFileSelectFields,
        },
      });

      await this.s3
        .deleteObject({
          Key: id,
          Bucket: this.bucket_name,
        })
        .promise();

      return file;
    } catch (error: any) {
      throw new HttpException(
        `File with identifier "${id}" was not found or you are not its owner.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Composes a part of object with pagination information (already displayed number of elements, current page, etc.).
   */
  async calculatePaginationInformation(
    skip: number,
    limit: number,
    fetchedAmount: number,
    userId?: string,
  ): Promise<Partial<ListFileResponse>> {
    skip = isNaN(skip) ? DEFAULT_SKIP : Math.max(+skip, 0);
    limit = isNaN(limit) ? DEFAULT_LIMIT : Math.max(+limit, 1);

    const totalItems = await this.prismaService.file.count({
      where: userId ? { ownerId: userId } : {},
    });
    const totalPages = Math.ceil(totalItems / limit);

    const currentItems = skip + fetchedAmount;
    const currentPage = Math.min(Math.ceil(skip / limit) + 1, totalPages);

    return {
      currentItems,
      totalItems,
      currentPage,
      totalPages,
    };
  }
}
