import type { PropsWithChildren, ReactElement } from 'react';
import type { Metadata } from 'next';
import { Stack } from 'ui';

export const metadata: Metadata = {
  title: 'ImageKeeper',
};

export default function RootLayout({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <html lang="en">
      <Stack BaseElement="body" direction="column" gap="3em">
        {children}
      </Stack>
    </html>
  );
}
