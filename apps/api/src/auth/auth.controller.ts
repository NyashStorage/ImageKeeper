import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequest } from './dao/requests/sign-up.request';
import { SignInRequest } from './dao/requests/sign-in.request';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {
  TokenResponse,
  TokensResponse,
} from '../tokens/dao/responses/token.response';
import { castToEntity } from '../utils/helpers/type.helpers';
import {
  ErrorResponse,
  ValidationErrorResponse,
} from '../app/dao/responses/error.response';
import { LogoutResponse } from './dao/responses/logout.response';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TokenInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Registers a user' })
  @ApiBody({ type: SignUpRequest })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'An account with email ":email" already registered.',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email should be in format "name@domain.com"',
    type: ValidationErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'password should not be empty',
    type: ValidationErrorResponse,
  })
  async signUp(@Body() signUpRequest: SignUpRequest): Promise<TokensResponse> {
    return castToEntity(this.authService.signUp(signUpRequest), TokensResponse);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Authorizes user' })
  @ApiBody({ type: SignInRequest })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'An account with email ":email" does not exist, try again or create a new account.',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Your authentication information is incorrect, please try again.',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email should be in format "name@domain.com"',
    type: ValidationErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'password should not be empty',
    type: ValidationErrorResponse,
  })
  async signIn(@Body() signInRequest: SignInRequest): Promise<TokensResponse> {
    return castToEntity(this.authService.signIn(signInRequest), TokensResponse);
  }

  @Delete()
  @ApiOperation({ summary: "Clears user's cookie" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LogoutResponse,
  })
  async logout(): Promise<LogoutResponse> {
    return { refresh_token: 'invalidate', success: true };
  }
}
