import { BsCheckLg as ConfirmIcon } from 'react-icons/bs';
import type { ReactElement } from 'react';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export function ConfirmButton({
  children = 'Confirm',
  ...props
}: ButtonProps): ReactElement {
  return (
    <Button {...props}>
      <ConfirmIcon /> {children}
    </Button>
  );
}
