'use client';

import type { ChangeEvent, ReactElement } from 'react';
import { useRef } from 'react';
import { v4 as randomUUID } from 'uuid';
import type {
  ErrorResponse,
  ImageResponse,
  StoredImage,
  WithRequestProcessors,
} from '../utils/types/api.types';
import type { AuthorizationSectionProps } from './AuthorizationSection';
import type { ImageCounterProps } from './images/ImageCounter';
import { UploadButton } from './buttons/UploadButton';

export interface UploadSectionProps
  extends Pick<AuthorizationSectionProps, 'user'>,
    Pick<ImageCounterProps, 'imageCount' | 'setImageCount'>,
    WithRequestProcessors {
  addImages: (images: StoredImage[], unshift?: boolean) => void;
  removeImages: (ids: StoredImage['id'][]) => void;
  changeImageLoadingState: (
    id: StoredImage['id'],
    loadedBytes: StoredImage['loadedBytes'],
  ) => void;

  uploadImagesRequest: (
    images: Record<StoredImage['id'], File>,
    progressHandler: UploadSectionProps['changeImageLoadingState'],
  ) => Promise<(ImageResponse | ErrorResponse)[]>;
}

export function UploadSection({
  addImages,
  removeImages,
  changeImageLoadingState,

  uploadImagesRequest,

  user,
  imageCount,
  setImageCount,
  requestErrorsMiddleware,
}: UploadSectionProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async ({
    target,
  }: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const fileList = target.files;
    if (!fileList) return;

    // Files prepared for tracking.
    const files: Record<StoredImage['id'], File> = {};

    // Set IDs for files so that they can be tracked later.
    for (const file of Array.from(fileList)) files[randomUUID()] = file;

    // Form images to be stored in store.
    const images: StoredImage[] = Object.entries(files).map(([id, file]) => ({
      id,
      url: '',
      createdAt: Number(new Date()),
      loadedBytes: 0,
      byteSize: file.size,
    }));

    const fileReaderFutures: Promise<void>[] = [];
    // Convert files into a preview link and put it into prepared images.
    for (const image of images) {
      fileReaderFutures.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          const timeout = setTimeout(() => reject(), 1000);

          reader.onloadend = () => {
            image.url = reader.result as string;

            clearTimeout(timeout);
            resolve();
          };

          reader.readAsDataURL(files[image.id]);
        }),
      );
    }

    // Waiting for all previews to be processed.
    await Promise.all(fileReaderFutures);

    // Add images to store for output to interface.
    addImages(images, true);

    // Close window with message that there are no images loaded, if it should have been opened earlier.
    if (imageCount === 0)
      setTimeout(() => document.querySelector('#empty-modal')?.remove(), 1);

    // Uploading images to server.
    const uploadedImages = await requestErrorsMiddleware(
      uploadImagesRequest(files, changeImageLoadingState),
    );

    if (!uploadedImages.length) return;

    // Updating data in store: deleting "uploaded" images and adding already fully uploaded images.
    removeImages(Object.keys(files));

    addImages(
      uploadedImages.map((file) => ({
        id: file.key,
        title: file.title,
        url: file.url,
        ownerId: file.ownerId,
        createdAt: file.createdAt,
      })),
      true,
    );
    setImageCount(imageCount + uploadedImages.length);
  };

  return (
    <>
      <UploadButton disabled={!user} onClick={() => inputRef.current?.click()}>
        Upload button
      </UploadButton>

      <input
        accept="image/jpg, image/jpeg, image/png"
        hidden
        multiple
        onChange={handleUpload}
        ref={inputRef}
        type="file"
      />
    </>
  );
}
