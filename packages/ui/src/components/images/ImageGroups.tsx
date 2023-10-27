'use client';

import type { ReactElement } from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import moment from 'moment';
import type { StoredImage } from '../../utils/types/api.types';
import type { ImageGroupProps } from './ImageGroup';
import { ImageGroup } from './ImageGroup';
import { LoadingImageGroup } from './LoadingImageGroup';

export type ImageGroupsProps = Omit<ImageGroupProps, 'title'>;

export function ImageGroups({
  images: storedImages,
  fetchMoreImages,

  ...props
}: ImageGroupsProps): ReactElement {
  const [images, setImages] = useState<Record<string, StoredImage[]>>({});

  useEffectOnce(() => {
    void fetchMoreImages().then();
  });

  useEffect(() => {
    setImages(
      // Sort pictures into groups by creation date.
      storedImages.reduce<Record<string, StoredImage[]>>(
        (localImages, storedImage) => {
          const group = moment(storedImage.createdAt).format('MMMM D');

          if (!(group in localImages)) localImages[group] = [];
          localImages[group].push(storedImage);

          return localImages;
        },
        {},
      ),
    );
  }, [storedImages]);

  return (
    <>
      {Object.entries(images).map(([group, groupImages]) => (
        <Suspense fallback={<LoadingImageGroup />} key={group}>
          <ImageGroup
            fetchMoreImages={fetchMoreImages}
            images={groupImages}
            key={group}
            title={group}
            {...props}
          />
        </Suspense>
      ))}
    </>
  );
}
