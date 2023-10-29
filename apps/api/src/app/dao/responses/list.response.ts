import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ListResponse<T> {
  @Expose()
  @ApiProperty({
    description:
      'Number of items that have already been displayed, given current page',
    nullable: false,
  })
  currentItems: number;

  @ApiProperty({ nullable: false })
  @Expose()
  totalItems: number;

  @ApiProperty({ nullable: false })
  @Expose()
  currentPage: number;

  @Expose()
  @ApiProperty({ nullable: false })
  totalPages: number;

  @Expose()
  @ApiProperty({ nullable: false })
  files: T[];
}
