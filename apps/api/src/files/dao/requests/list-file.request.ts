import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListFileRequest {
  @IsOptional()
  @ApiProperty({
    description: 'Current pagination page',
    nullable: false,
    required: false,
    default: 1,
  })
  page?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Number of records received',
    nullable: false,
    required: false,
    default: 10,
  })
  limit?: number;
}
