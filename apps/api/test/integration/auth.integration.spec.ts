import { HttpStatus } from '@nestjs/common';
import { v4 as randomUUID } from 'uuid';
import { httpClient } from '../jest.setup';
import { SignUpRequest } from '../../src/auth/dao/requests/sign-up.request';
import { SignInRequest } from '../../src/auth/dao/requests/sign-in.request';

import { DaniilUser } from '../fixtures/users';

describe('Auth Integration', () => {
  describe('[POST] /api/auth/sign-up', () => {
    it('should register new user', async () => {
      const dto: SignUpRequest = {
        email: `${randomUUID()}@test.com`,
        password: randomUUID(),
      };

      const { body, headers } = await signUp(dto).expect(HttpStatus.CREATED);

      expect(body).toHaveProperty('access_token');
      expect(headers).toHaveProperty('set-cookie');

      const cookies = headers['set-cookie'];
      const refreshToken = cookies.find((cookie: string) =>
        cookie.startsWith('refresh_token='),
      );
      expect(refreshToken).toBeDefined();
    });

    it('should return error when user with this email already exists', async () => {
      const dto: SignUpRequest = {
        email: DaniilUser.email,
        password: randomUUID(),
      };

      const { body } = await signUp(dto).expect(HttpStatus.FORBIDDEN);

      expect(body.message).toEqual(
        `An account with email "${dto.email}" already registered.`,
      );
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: DaniilUser.email,
      };

      const { body } = await signUp(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual(['password should not be empty']);
    });
  });

  describe('[POST] /api/auth/sign-in', () => {
    it('should sign-in user by email and password', async () => {
      const dto: SignInRequest = {
        email: DaniilUser.email,
        password: 'qwerty123',
      };

      const { body, headers } = await signIn(dto).expect(HttpStatus.CREATED);

      expect(body).toHaveProperty('access_token');
      expect(headers).toHaveProperty('set-cookie');

      const cookies = headers['set-cookie'];
      const refreshToken = cookies.find((cookie: string) =>
        cookie.startsWith('refresh_token='),
      );
      expect(refreshToken).toBeDefined();
    });

    it('should return error when sending an invalid password', async () => {
      const dto: SignInRequest = {
        email: DaniilUser.email,
        password: randomUUID(),
      };

      const { body } = await signIn(dto).expect(HttpStatus.UNAUTHORIZED);

      expect(body.message).toEqual(
        'Your authentication information is incorrect, please try again.',
      );
    });

    it('should return error when user doesnt exist', async () => {
      const dto: SignInRequest = {
        email: `${randomUUID()}@bad.com`,
        password: 'qwerty123',
      };

      const { body } = await signIn(dto).expect(HttpStatus.NOT_FOUND);

      expect(body.message).toEqual(
        `An account with email "${dto.email}" does not exist, try again or create a new account.`,
      );
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: `${randomUUID()}@bad.com`,
      };

      const { body } = await signIn(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual(['password should not be empty']);
    });
  });
});

const signUp = (body: SignUpRequest | any) =>
  httpClient.post('/auth/sign-up').send(body);

const signIn = (body: SignInRequest | any) =>
  httpClient.post('/auth/sign-in').send(body);
