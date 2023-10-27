import { CiLogin as LoginIcon, CiLogout as LogoutIcon } from 'react-icons/ci';
import type { ReactElement } from 'react';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export interface AuthorizationButtonProps extends ButtonProps {
  email?: string | undefined;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function AuthorizationButton({
  email,
  onLogin = () => {},
  onLogout = () => {},
  ...props
}: AuthorizationButtonProps): ReactElement {
  return (
    <Button {...props} onClick={email ? onLogout : onLogin}>
      {email ? <LogoutIcon /> : <LoginIcon />} {email || 'Login'}
    </Button>
  );
}
