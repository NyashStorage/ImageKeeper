import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokensResponse } from './dao/responses/token.response';
import { JwtPayloadDto } from '../app/dao/jwt-payload.dto';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates access and refresh tokens with payload content inside.
   */
  public generateTokens(payload: JwtPayloadDto): TokensResponse {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',
      }),

      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  /**
   * Generates new access and refresh tokens if refresh token is correct.
   * @throws HttpException Refresh token not specified.
   * @throws HttpException Refresh token is invalid.
   */
  public refreshToken(
    refreshToken: TokensResponse['refresh_token'],
  ): TokensResponse {
    if (!refreshToken)
      throw new HttpException(
        'Refresh token not specified, log in to your account.',
        HttpStatus.UNAUTHORIZED,
      );

    let decodedData: JwtPayloadDto;
    try {
      decodedData = this.verifyToken(refreshToken);
    } catch (error) {
      throw new HttpException(
        'Refresh token is invalid, re-authorize your account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.generateTokens(decodedData);
  }

  /**
   * Gets payload data from token.
   */
  public verifyToken(token: string): JwtPayloadDto | any {
    const payload = this.jwtService.verify(token);

    delete payload['iat'];
    delete payload['exp'];

    return payload;
  }

  /**
   * Adds cookie with refresh token to response.
   */
  public prepareTokenCookie(
    refreshToken: TokensResponse['refresh_token'],
    response: Response,
  ): void {
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  /**
   * Adds expired cookie with invalid refresh token to response.
   */
  public invalidateTokenCookie(response: Response): void {
    response.cookie('refresh_token', 'invalid', { expires: new Date(0) });
  }
}
