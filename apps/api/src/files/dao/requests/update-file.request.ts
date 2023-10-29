import { PickType } from '@nestjs/swagger';
import { FileModel } from '../../models/file.model';

export class UpdateFileRequest extends PickType(FileModel, ['title']) {}
