import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { FileModel } from '../../files/models/file.model';
import { imageToLink } from '../../utils/helpers/transform.helpers';

export class UserModel {
  @Expose()
  @ApiProperty({
    description: 'User ID in database',
    nullable: false,
  })
  id: string;

  @IsEmail({}, { message: 'Email should be in format "name@domain.com"' })
  @Expose()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    required: true,
  })
  password: string;

  @Transform(({ value }) => imageToLink(value))
  @Expose()
  @ApiProperty({
    description: 'Files owned by user',
    nullable: false,
  })
  files: FileModel[];

  @ApiProperty({
    description: 'Time of object creation',
    nullable: false,
  })
  createdAt: Date;
}
