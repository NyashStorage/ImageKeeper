'use client';

import type { ReactElement } from 'react';
import { useState } from 'react';
import { IconedInput } from '../inputs/IconedInput';
import { Typography } from '../Typography';
import { PasswordInput } from '../inputs/PasswordInput';
import type { ModalProps } from './Modal';
import { Modal } from './Modal';

export interface AuthorizationModalProps extends Omit<ModalProps, 'onConfirm'> {
  onAuthorize: (email: string, password: string) => void;
}

export function AuthorizationModal({
  onAuthorize = () => {},
  ...props
}: AuthorizationModalProps): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal
      confirmButtonTitle="Authorize"
      onConfirm={() => onAuthorize(email, password)}
      {...props}
    >
      <Typography className="primary-400" variant="h2">
        Authorization
      </Typography>

      <IconedInput
        onChange={setEmail}
        placeholder="Email"
        required
        value={email}
        width="calc(10vw + 30vh)"
      />

      <PasswordInput
        onChange={setPassword}
        placeholder="Password"
        required
        value={password}
        width="calc(10vw + 30vh)"
      />

      <Typography className="primary-300" textAlign="center" variant="small">
        If you don&apos;t have an account - it will be created automatically.
      </Typography>
    </Modal>
  );
}
