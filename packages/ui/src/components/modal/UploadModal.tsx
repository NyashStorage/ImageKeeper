import { AiOutlineCloudUpload as UploadIcon } from 'react-icons/ai';
import type { ReactElement } from 'react';
import type { StackProps } from '../Stack';
import { Stack } from '../Stack';
import type { CssProps } from '../../utils/helpers/style.helpers';
import { Typography } from '../Typography';
import type { ModalProps } from './Modal';

export interface UploadModalProps
  extends Pick<ModalProps, 'visible'>,
    StackProps,
    CssProps {}

export function UploadModal({
  visible = false,

  className = '',
  sx = {},

  ...props
}: UploadModalProps): ReactElement {
  const modalClasses = `modal ${visible ? '' : 'hide'} ${className}`;

  return (
    <Stack
      BaseElement="aside"
      className={modalClasses}
      direction="column"
      sx={{
        gap: '1em',
        ...sx,
      }}
      {...props}
    >
      <UploadIcon
        className="green"
        style={{
          fontSize: '5em',
          transform: 'translateY(1rem)',
        }}
      />

      <Typography className="primary-400" variant="h1">
        Upload file
      </Typography>

      <Typography className="primary-300" variant="default">
        Drop your file here to start uploading
      </Typography>
    </Stack>
  );
}
