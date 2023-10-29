import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpRequest } from './dao/requests/sign-up.request';
import { SignInRequest } from './dao/requests/sign-in.request';
import { TokensService } from '../tokens/tokens.service';
import { TokensResponse } from '../tokens/dao/responses/token.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  /**
   * @throws HttpException An account with same email already registered.
   */
  async signUp(signUpRequest: SignUpRequest): Promise<TokensResponse> {
    const { id: userId } = await this.usersService.create(signUpRequest);

    return this.tokensService.generateTokens({ userId });
  }

  /**
   * @throws HttpException An account with such email does not exist.
   * @throws HttpException Authentication information is incorrect.
   */
  async signIn({ email, password }: SignInRequest): Promise<TokensResponse> {
    const user = await this.usersService.find({ email }, { password: true });

    if (user === null)
      throw new HttpException(
        `An account with email "${email}" does not exist, try again or create a new account.`,
        HttpStatus.NOT_FOUND,
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        'Your authentication information is incorrect, please try again.',
        HttpStatus.UNAUTHORIZED,
      );

    return this.tokensService.generateTokens({ userId: user.id });
  }
}
