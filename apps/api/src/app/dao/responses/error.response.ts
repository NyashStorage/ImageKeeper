import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ErrorResponse {
  @Expose()
  @ApiProperty({
    description: 'Error message',
    nullable: false,
  })
  message: string;

  @Expose()
  @ApiProperty({
    description: 'HTTP code with which requests ended',
    nullable: false,
  })
  statusCode: number;
}

export class ValidationErrorResponse extends PickType(ErrorResponse, [
  'statusCode',
]) {
  @Expose()
  @ApiProperty({
    description: 'Validation error messages',
    nullable: false,
  })
  message: [string];

  @Expose()
  @ApiProperty({
    description: 'Name of HTTP error with which requests was ended',
    nullable: false,
  })
  error: string;
}
