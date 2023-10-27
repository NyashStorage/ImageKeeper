'use client';
import '../../assets/styles/components/images/_interactable-image.scss';

import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';
import humanizeBytes from 'pretty-bytes';
import { AiOutlineDownload } from 'react-icons/ai';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import type { CardProps } from '../Card';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { FadeIn } from '../FadeIn';
import { Image } from './Image';

// Types
export interface InteractableImageProps
  extends UploadingImageSectionProps,
    CardProps {
  id: string;
  title?: string;
  url: string;

  state?: 'uploaded' | 'uploading';
  variant?: 'long' | 'short';

  isOwned?: boolean;
  onDownload?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface UploadingImageSectionProps {
  loadedBytes?: number;
  byteSize?: number;
}

// Helpers
export function ImageMenuItem({
  onClick,
  children,
}: { onClick: () => void } & PropsWithChildren): ReactElement {
  return (
    <Typography
      className="image__interactable__menu__item"
      onClick={onClick}
      variant="large"
    >
      {children}
    </Typography>
  );
}

export function InteractableImage({
  id,
  title = '',
  url,

  state = 'uploaded',
  variant = 'long',

  isOwned,
  onDownload = () => {},
  onEdit = () => {},
  onDelete = () => {},

  ...props
}: InteractableImageProps): ReactElement {
  const [hovered, setHovered] = useState(false);

  const imageVariantClass = `image__interactable--${
    variant === 'long' || hovered ? 'long' : 'short'
  }`;
  const imageFilterClass = {
    filter:
      state === 'uploading'
        ? 'opacity(0.5)'
        : hovered
        ? 'brightness(0.5)'
        : 'none',
  };

  const showMenu = (): void => {
    if (state === 'uploading') return;
    setHovered(true);
  };

  const hideMenu = (): void => {
    if (state === 'uploading') return;
    setHovered(false);
  };

  return (
    <Card
      className={`image__interactable fade-in ${imageVariantClass}`}
      elevation={3}
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
    >
      {state !== 'uploading' && (
        <Typography className="image__interactable__title" variant="small">
          {title}
        </Typography>
      )}

      <Image
        sx={{
          height: '100%',
          ...imageFilterClass,
        }}
        url={url}
      />

      {state === 'uploading' && <UploadingImageSection {...props} />}

      <FadeIn visible={hovered}>
        <div className="image__interactable__menu">
          <ImageMenuItem onClick={() => onDownload(id)}>
            <AiOutlineDownload /> Download
          </ImageMenuItem>

          {isOwned && (
            <ImageMenuItem onClick={() => onEdit(id)}>
              <TbEdit /> Edit title
            </ImageMenuItem>
          )}

          {isOwned && (
            <ImageMenuItem onClick={() => onDelete(id)}>
              <RiDeleteBin2Line /> Delete
            </ImageMenuItem>
          )}
        </div>
      </FadeIn>
    </Card>
  );
}

function UploadingImageSection({
  loadedBytes = 0,
  byteSize = 0,
}: UploadingImageSectionProps): ReactElement {
  return (
    <div className="image__interactable__uploading">
      <div
        className="image__interactable__uploading__progress"
        style={{
          width: `${Math.ceil((loadedBytes / byteSize) * 100)}%`,
        }}
      />

      <Typography variant="h3">Uploading</Typography>

      <Typography variant="small">
        {humanizeBytes(loadedBytes, { space: false })} of{' '}
        {humanizeBytes(byteSize, { space: false })}
      </Typography>
    </div>
  );
}
