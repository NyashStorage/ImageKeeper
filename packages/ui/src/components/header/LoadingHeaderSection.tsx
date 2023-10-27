import type { ReactElement } from 'react';
import { Stack } from '../Stack';
import { Skeleton } from '../Skeleton';
import { AuthorizationButton } from '../buttons/AuthorizationButton';
import { UploadButton } from '../buttons/UploadButton';

export function LoadingHeader(): ReactElement {
  return (
    <Stack
      BaseElement="header"
      className="container"
      sx={{ justifyContent: 'space-between' }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: '0.875em',
        }}
      >
        <img
          alt="ImageKeeper logo"
          height="25"
          src="/logo.svg"
          style={{ borderRadius: 0 }}
          width="183"
        />

        <Skeleton height="1em" width="8.625em" />
      </Stack>

      <Stack gap="0.875em">
        <AuthorizationButton disabled />
        <UploadButton disabled>Upload button</UploadButton>
      </Stack>
    </Stack>
  );
}
