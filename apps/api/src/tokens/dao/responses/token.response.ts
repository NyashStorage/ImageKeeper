import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenResponse {
  @Expose()
  @ApiProperty({
    description: 'Access token to protected API sections',
    nullable: false,
  })
  access_token: string;
}

export class TokensResponse extends PickType(TokenResponse, ['access_token']) {
  @Expose()
  @ApiProperty({
    description: 'Token for refreshing access token',
    nullable: false,
  })
  refresh_token: string;
}
