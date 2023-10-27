import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import type { ReactElement } from 'react';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export function CloseButton({
  children = 'Close',
  ...props
}: ButtonProps): ReactElement {
  return (
    <Button {...props}>
      <CloseIcon /> {children}
    </Button>
  );
}
