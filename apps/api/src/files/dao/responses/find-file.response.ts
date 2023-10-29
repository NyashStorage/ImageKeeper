import { PickType } from '@nestjs/swagger';
import { FileModel } from '../../models/file.model';
import { imageToLink } from '../../../utils/helpers/transform.helpers';
import { Expose, Transform } from 'class-transformer';

export class FindFileResponse extends PickType(FileModel, [
  'key',
  'title',
  'ownerId',
  'createdAt',
  'updatedAt',
]) {
  @Transform(({ value }) => imageToLink(value))
  @Expose()
  url: FileModel;
}
