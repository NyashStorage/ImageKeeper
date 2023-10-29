import * as request from 'supertest';
import { UserFixture } from '../../fixtures/users';
import { TokensService } from '../../../src/tokens/tokens.service';

interface AuthorizedRequestOptions {
  user?: UserFixture;
  token?: string;
}

/**
 * Adds data required for authorization to request.
 */
export const makeAuthorizedRequest = (
  request: request.Test,
  service: TokensService,
  { user, token }: AuthorizedRequestOptions = {},
): request.Test => {
  if (!token && user)
    token = service.generateTokens({
      userId: user.id,
    }).access_token;

  return token ? request.set('Authorization', `Bearer ${token}`) : request;
};
