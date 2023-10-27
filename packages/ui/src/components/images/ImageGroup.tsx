'use client';

import type { MouseEvent, ReactElement } from 'react';
import { useRef } from 'react';
import type {
  ErrorResponse,
  ImageResponse,
  StoredImage,
  WithRequestProcessors,
} from '../../utils/types/api.types';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import type { UploadSectionProps } from '../UploadSection';
import type { EditorModalProps } from '../modal/EditorModal';
import { InteractableImage } from './InteractableImage';

export interface ImageGroupProps
  extends Pick<
      UploadSectionProps,
      'imageCount' | 'setImageCount' | 'removeImages' | 'user'
    >,
    Pick<EditorModalProps, 'setEditorImageInfo'>,
    WithRequestProcessors {
  title: string;
  images: StoredImage[];

  fetchMoreImages: () => Promise<void>;
  deleteImageRequest: (
    id: StoredImage['id'],
  ) => Promise<ImageResponse | ErrorResponse>;
}

export function ImageGroup({
  title,
  images,

  fetchMoreImages,
  deleteImageRequest,

  user,
  imageCount,
  setImageCount,
  removeImages,
  setEditorImageInfo,

  requestErrorMiddleware,
}: ImageGroupProps): ReactElement {
  const mouseDownLocationRef = useRef(0);
  const previousPercentageRef = useRef(0);
  const percentageRef = useRef(0);

  const downHandler = ({
    button,
    clientX,
    currentTarget,
  }: MouseEvent<HTMLDivElement>): void => {
    if (button !== 0) return;
    // Save coordinates from slider where left mouse button was clicked.
    mouseDownLocationRef.current = clientX - currentTarget.offsetLeft;
  };

  const upHandler = (_: MouseEvent<HTMLDivElement>): void => {
    // Save progress of slider scrolling.
    mouseDownLocationRef.current = 0;
    previousPercentageRef.current = percentageRef.current;
  };

  const moveHandler = ({
    currentTarget,
    clientX,
  }: MouseEvent<HTMLDivElement>): void => {
    if (mouseDownLocationRef.current === 0) return;

    const sliderElement = document.querySelector(
      `#${title.replace(' ', '')}-slider`,
    );
    if (!sliderElement) return;

    // Calculate relative distance traveled by mouse.
    const maxDelta = sliderElement.clientWidth / 2;
    const mouseDelta =
      mouseDownLocationRef.current - (clientX - currentTarget.offsetLeft);

    const percentage = (mouseDelta / maxDelta) * -100;

    // Get more images when slider is close to end.
    if (previousPercentageRef.current + percentage < -30)
      void fetchMoreImages().then();

    // Limit scrolling to certain percentage values.
    const nextPercentage = Math.max(
      Math.min(previousPercentageRef.current + percentage, 0),
      -50,
    );

    percentageRef.current = percentage;

    // Smoothly shift elements by necessary percentage, and pictures, achieving effect of parallax.
    sliderElement.animate(
      {
        transform: `translateX(${nextPercentage}%)`,
      },
      { duration: 1200, fill: 'forwards' },
    );

    const imageElements = Array.from(sliderElement.querySelectorAll('img'));
    for (const image of imageElements)
      image.animate(
        { objectPosition: `${60 + nextPercentage}% center` },
        { duration: 1200, fill: 'forwards' },
      );
  };

  const downloadHandler = (url: StoredImage['url']): void => {
    window.open(url, '_blank');
  };

  const editHandler = ({ id, title: imageTitle, url }: StoredImage): void => {
    setEditorImageInfo(id, imageTitle || '', url);
  };

  const deleteHandler = async (id: StoredImage['id']): Promise<void> => {
    const response = await requestErrorMiddleware(deleteImageRequest(id));
    if (!response) return;

    removeImages([id]);
    setImageCount(imageCount - 1);
  };

  return (
    <Stack
      className="container"
      direction="column"
      gap="1.25em"
      onMouseDown={downHandler}
      onMouseLeave={upHandler}
      onMouseMove={moveHandler}
      onMouseUp={upHandler}
      sx={{ cursor: 'grab' }}
    >
      <Typography className="primary-200" variant="h1">
        {title}
      </Typography>

      <Stack sx={{ padding: '1em 0', overflowX: 'hidden' }}>
        <Stack id={`${title.replace(' ', '')}-slider`} sx={{ gap: '1em' }}>
          {images.map((image) =>
            image.byteSize ? (
              <InteractableImage
                byteSize={image.byteSize}
                id={image.id}
                key={image.id}
                loadedBytes={image.loadedBytes}
                state="uploading"
                url={image.url}
              />
            ) : (
              <InteractableImage
                id={image.id}
                isOwned={image.ownerId === user?.id}
                key={image.id}
                onDelete={() => deleteHandler(image.id)}
                onDownload={() => downloadHandler(image.url)}
                onEdit={() => editHandler(image)}
                title={image.title}
                url={image.url}
                variant="short"
              />
            ),
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
