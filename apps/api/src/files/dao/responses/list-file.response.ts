import { FindFileResponse } from './find-file.response';
import { ListResponse } from '../../../app/dao/responses/list.response';
import { Expose } from 'class-transformer';

export class ListFileResponse extends ListResponse<FindFileResponse> {
  @Expose()
  files: FindFileResponse[];
}
