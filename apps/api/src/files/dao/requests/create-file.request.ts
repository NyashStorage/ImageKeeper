import { PickType } from '@nestjs/swagger';
import { FileModel } from '../../models/file.model';

export class CreateFileRequest extends PickType(FileModel, [
  'title',
  'ownerId',
]) {}
