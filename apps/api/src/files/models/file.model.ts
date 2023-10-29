import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class FileModel {
  @Expose()
  @ApiProperty({ nullable: false })
  key: string;

  @ApiProperty({
    description: 'File type (e.g. png, mp4)',
    nullable: false,
  })
  contentType: string;

  @ApiProperty({
    description: 'File S3 bucket',
    nullable: false,
  })
  bucket: string;

  @MaxLength(100)
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'File owner ID',
    nullable: false,
    required: true,
  })
  ownerId: string;

  @Expose()
  @ApiProperty({
    description: 'Time of object creation',
    nullable: false,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Time of last object update',
    nullable: false,
  })
  updatedAt: Date;
}
