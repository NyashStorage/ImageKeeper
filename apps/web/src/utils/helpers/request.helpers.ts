import '../extensions/string.extensions';

import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { ErrorResponse } from 'ui';
import { useNotificationStore } from '../../store/notification.store';
import { useAuthStore } from '../../store/auth.store';

axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;

/**
 * Handles errors from response by displaying them using notifications, and returns successful data.
 */
export const requestErrorMiddleware = async <T>(
  response: Promise<T | ErrorResponse>,
): Promise<T | undefined> => {
  const data = await response;
  const errorResponse = data as ErrorResponse;

  if (!Object.hasOwn(errorResponse, 'statusCode')) return data as T;

  const errors = Array.isArray(errorResponse.message)
    ? errorResponse.message
    : [errorResponse.message];

  for (const error of errors)
    useNotificationStore
      .getState()
      .addNotification(error.capitalize(), 'error');
};

/**
 * Handles errors from response by displaying them using notifications, and returns successful data.
 */
export const requestErrorsMiddleware = async <T>(
  response: Promise<(T | ErrorResponse)[]>,
): Promise<T[]> => {
  const data = await response;
  const promises: Promise<T | undefined>[] = [];

  for (const element of data)
    promises.push(
      requestErrorMiddleware(element as Promise<ErrorResponse | T>),
    );

  const result = await Promise.all(promises);
  return result.filter((element) => element !== undefined) as T[];
};

/**
 * Saves new token to store if it was received in response.
 */
export const accessTokenMiddleware = <T>(
  response: AxiosResponse<T>,
): AxiosResponse<T> => {
  const token = response.headers['x-access-token'] as string | undefined;
  if (token) useAuthStore.getState().setToken(token);

  return response;
};

/**
 * Prepares request by adding data needed to access protected methods.
 */
export const withAuthorization = (
  request: AxiosInstance = axios.create(),
): AxiosInstance => {
  request.defaults.headers.common.Authorization = `Bearer ${
    useAuthStore.getState().token
  }`;

  return request;
};

export const isSuccessCode = (status: number): boolean =>
  status >= 200 && status < 300;
