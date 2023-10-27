import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { CssProps } from '../../utils/helpers/style.helpers';

export interface ImageProps extends HTMLAttributes<HTMLImageElement>, CssProps {
  url: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export function Image({
  url,
  width,
  height,
  sx = {},
  ...props
}: ImageProps): ReactElement {
  return (
    <img
      alt={url}
      draggable="false"
      src={url}
      style={{
        width,
        height,
        ...sx,
      }}
      {...props}
    />
  );
}
