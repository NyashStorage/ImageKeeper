import type { NotificationProps } from '../../components/notifications/Notification';

// API responses.
export interface ErrorResponse {
  statusCode: number;
  message: string | [string];
}

export interface TokenResponse {
  access_token: string;
}

export interface LogoutResponse {
  success: boolean;
}

export interface UserResponse {
  id: string;
  email: string;
}

export interface ImageResponse {
  key: string;
  title: string;
  ownerId: string;
  url: string;
  createdAt: number;
  updatedAt: number;
}

export interface ImagesResponse {
  currentItems: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  files: ImageResponse[];
}

// Stores.
export interface StoredImage {
  id: string;
  title?: string;
  url: string;
  ownerId?: string;
  createdAt: number;

  loadedBytes?: number;
  byteSize?: number;
}

export interface StoredNotification {
  id: string;
  type: NotificationProps['variant'];
  message: string;
  visible: boolean;
}

// Helpers.
export interface WithRequestProcessors {
  requestErrorMiddleware: <T>(
    response: Promise<T | ErrorResponse>,
  ) => Promise<T | undefined>;

  requestErrorsMiddleware: <T>(
    response: Promise<(T | ErrorResponse)[]>,
  ) => Promise<T[]>;
}
