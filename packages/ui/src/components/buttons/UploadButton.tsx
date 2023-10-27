import { AiOutlineCloudUpload as UploadIcon } from 'react-icons/ai';
import type { ReactElement } from 'react';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export function UploadButton({
  children,
  ...props
}: ButtonProps): ReactElement {
  return (
    <Button {...props}>
      <UploadIcon /> {children}
    </Button>
  );
}
