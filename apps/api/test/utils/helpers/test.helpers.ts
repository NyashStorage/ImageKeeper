import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ObjectIdentifier } from 'aws-sdk/clients/s3';
import { User } from 'database';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { usersFixture } from '../../fixtures/users';

export const fillDatabase = async (
  prisma: PrismaService,
  config: ConfigService,
) => {
  // Disable foreign keys.
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'replica';`);

  // Cleanup database.
  await prisma.user.deleteMany();
  await prisma.file.deleteMany();

  // Cleanup S3.
  await cleanupS3(config);

  // Seed users
  await prisma.user.createMany({
    data: usersFixture as User[],
  });

  // Enable foreign keys.
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'origin';`);
};

/**
 * Deletes all files from S3.
 */
export const cleanupS3 = async (config: ConfigService) => {
  const bucket = config.get('aws_bucket_name');
  const s3 = new S3({
    region: config.get('aws_region'),
    credentials: {
      accessKeyId: config.get('aws_access_key'),
      secretAccessKey: config.get('aws_secret_key'),
    },
  });

  const awsFiles = await s3
    .listObjects({
      Bucket: bucket,
    })
    .promise();

  if (awsFiles.Contents.length > 0)
    await s3
      .deleteObjects({
        Delete: {
          Objects: awsFiles.Contents.map(
            (file) => ({ Key: file.Key }) as ObjectIdentifier,
          ),
        },
        Bucket: bucket,
      })
      .promise();
};
