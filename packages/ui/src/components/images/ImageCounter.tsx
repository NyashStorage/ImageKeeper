'use client';

import { useEffectOnce } from 'react-use';
import type { ReactElement } from 'react';
import { Typography } from '../Typography';

export interface ImageCounterProps {
  imageCount: number;
  setImageCount: (count: number) => void;
  fetchImageCount: () => Promise<number>;
}

export function ImageCounter({
  imageCount,
  setImageCount,
  fetchImageCount,
}: ImageCounterProps): ReactElement {
  useEffectOnce(() => {
    void fetchImageCount().then(setImageCount);
  });

  return (
    <Typography className="primary-300" variant="small">
      {imageCount} images stored in keeper
    </Typography>
  );
}
