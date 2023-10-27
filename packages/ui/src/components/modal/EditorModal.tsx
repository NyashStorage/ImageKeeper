'use client';

import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Typography } from '../Typography';
import { Image } from '../images/Image';
import { Stack } from '../Stack';
import { IconedInput } from '../inputs/IconedInput';
import type { InteractableImageProps } from '../images/InteractableImage';
import type {
  ErrorResponse,
  ImageResponse,
  StoredImage,
  WithRequestProcessors,
} from '../../utils/types/api.types';
import type { ModalProps } from './Modal';
import { Modal } from './Modal';

export interface EditorModalProps
  extends Omit<ModalProps, 'onConfirm'>,
    WithRequestProcessors {
  imageId: InteractableImageProps['id'];
  imageUrl: InteractableImageProps['url'];
  imageTitle: InteractableImageProps['title'];

  setEditorImageInfo: (
    id: InteractableImageProps['id'],
    title: InteractableImageProps['title'],
    url: InteractableImageProps['url'],
  ) => void;
  changeImageTitle: (
    id: InteractableImageProps['id'],
    title: InteractableImageProps['title'],
  ) => void;

  updateImageRequest: (
    id: StoredImage['id'],
    title: NonNullable<StoredImage['title']>,
  ) => Promise<ImageResponse | ErrorResponse>;
}

export function EditorModal({
  imageId,
  imageUrl,
  imageTitle = '',

  setEditorImageInfo,
  changeImageTitle,

  updateImageRequest,

  requestErrorMiddleware,

  ...props
}: EditorModalProps): ReactElement {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(imageTitle);
  }, [imageTitle]);

  const handleConfirm = (): void => {
    void requestErrorMiddleware(updateImageRequest(imageId, title)).then(
      (response) => {
        if (!response) return;

        changeImageTitle(response.key, response.title);
        handleClose();
      },
    );
  };

  const handleClose = (): void => {
    setEditorImageInfo('', undefined, '');
  };

  return (
    <Modal
      closeButtonTitle="Close editor"
      confirmButtonTitle="Save"
      onClose={handleClose}
      onConfirm={handleConfirm}
      visible={Boolean(imageId)}
      {...props}
    >
      <Typography className="primary-400" variant="h2">
        Set custom label
      </Typography>

      <Stack direction="column" gap="1.25em">
        <Image height="200px" url={imageUrl} width="335px" />

        <Stack direction="column" gap="0.625em">
          <IconedInput
            onChange={(value) => setTitle(value)}
            placeholder="Enter custom label"
            textAlign="center"
            value={title}
          />

          <Typography
            className="primary-300"
            textAlign="center"
            variant="small"
          >
            100 chars max
          </Typography>
        </Stack>
      </Stack>
    </Modal>
  );
}
