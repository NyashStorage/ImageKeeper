import axios from 'axios';
import type {
  ErrorResponse,
  LogoutResponse,
  TokenResponse,
  UserResponse,
} from 'ui';
import {
  accessTokenMiddleware,
  isSuccessCode,
  withAuthorization,
} from '../utils/helpers/request.helpers';

const backendUrl = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const backendUsersUrl = `${backendUrl}/users`;
const backendAuthUrl = `${backendUrl}/auth`;

/**
 * Gets the current user by access token.
 */
export const getUser = async (): Promise<UserResponse | ErrorResponse> => {
  const { data } = accessTokenMiddleware(
    await withAuthorization().get<UserResponse | ErrorResponse>(
      `${backendUsersUrl}/me`,
    ),
  );

  return data;
};

/**
 * Checks if user with provided email is registered.
 */
const hasUser = async (email: string): Promise<boolean> => {
  const { status } = await axios.get(`${backendUsersUrl}/email/${email}`);
  return isSuccessCode(status);
};

/**
 * Registers a user if no such email has been registered yet or tries to authorize an existing user.
 */
export const authorize = async (
  email: string,
  password: string,
): Promise<string | ErrorResponse> => {
  const isLogin = await hasUser(email);

  const { data, status } = await axios.post<TokenResponse | ErrorResponse>(
    `${backendAuthUrl}/${isLogin ? 'sign-in' : 'sign-up'}`,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return isSuccessCode(status)
    ? (data as TokenResponse).access_token
    : (data as ErrorResponse);
};

/**
 * Clears cookie, destroying "refresh_token", which prevents authorization session from being refreshed.
 */
export const logout = async (): Promise<LogoutResponse | ErrorResponse> => {
  const { data, status } = await axios.delete<LogoutResponse | ErrorResponse>(
    backendAuthUrl,
  );

  return isSuccessCode(status)
    ? (data as LogoutResponse)
    : (data as ErrorResponse);
};
