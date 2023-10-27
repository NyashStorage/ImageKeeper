'use client';

import type { ReactElement } from 'react';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import type {
  ErrorResponse,
  LogoutResponse,
  UserResponse,
  WithRequestProcessors,
} from '../utils/types/api.types';
import { AuthorizationButton } from './buttons/AuthorizationButton';
import { AuthorizationModal } from './modal/AuthorizationModal';

export interface AuthorizationSectionProps extends WithRequestProcessors {
  user: UserResponse | undefined;
  setUser: (user: AuthorizationSectionProps['user']) => void;
  fetchUser: () => Promise<
    NonNullable<AuthorizationSectionProps['user']> | ErrorResponse
  >;

  token: string | undefined;
  setToken: (token: AuthorizationSectionProps['token']) => void;

  authorizeRequest: (
    email: string,
    password: string,
  ) => Promise<string | ErrorResponse>;
  logoutRequest: () => Promise<LogoutResponse | ErrorResponse>;
}

export function AuthorizationSection({
  user,
  setUser,
  fetchUser,

  token,
  setToken,

  authorizeRequest,
  logoutRequest,

  requestErrorMiddleware,
}: AuthorizationSectionProps): ReactElement {
  const [menuVisible, setMenuVisible] = useState(false);

  useUpdateEffect(() => {
    // Change user data for re-rendering components if user is successfully logged in/out.
    void fetchUser().then((data) =>
      setUser(
        Object.getOwnPropertyNames(data).includes('statusCode')
          ? undefined
          : (data as UserResponse),
      ),
    );
  }, [token]);

  const authorize = async (email: string, password: string): Promise<void> => {
    const response = await requestErrorMiddleware(
      authorizeRequest(email, password),
    );
    if (!response) return;

    // User's data will be updated with hook above.
    setToken(response);
    setMenuVisible(false);
  };

  const logout = async (): Promise<void> => {
    const response = await requestErrorMiddleware(logoutRequest());
    if (!response) return;

    // User's data will be updated with hook above.
    setToken(undefined);
  };

  return (
    <>
      <AuthorizationButton
        email={user?.email}
        onLogin={() => setMenuVisible(true)}
        onLogout={logout}
      />

      <AuthorizationModal
        onAuthorize={authorize}
        onClose={() => setMenuVisible(false)}
        visible={menuVisible}
      />
    </>
  );
}
