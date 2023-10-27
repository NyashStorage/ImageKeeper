import type { ReactElement } from 'react';
import { Stack } from '../Stack';
import { Skeleton } from '../Skeleton';

export function LoadingImageGroup(): ReactElement {
  return (
    <Stack className="container" direction="column" gap="1.25em">
      <Skeleton height="1.75em" width="13.5em" />

      <Stack sx={{ padding: '1em 0', overflowX: 'hidden' }}>
        <Stack sx={{ gap: '1em' }}>
          <Skeleton height="12.5em" width="9.3em" />
          <Skeleton height="12.5em" width="21em" />
          <Skeleton height="12.5em" width="9.3em" />
          <Skeleton height="12.5em" width="9.3em" />
          <Skeleton height="12.5em" width="21em" />
        </Stack>
      </Stack>
    </Stack>
  );
}
