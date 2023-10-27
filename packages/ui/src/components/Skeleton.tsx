import '../assets/styles/components/_skeleton.scss';

import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { CssProps } from '../utils/helpers/style.helpers';

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    CssProps {
  elevation?: number;

  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export function Skeleton({
  elevation = 1,
  width,
  height,

  className = '',
  sx = {},
  ...props
}: SkeletonProps): ReactElement {
  return (
    <div
      className={`skeleton box-shadow-${elevation} ${className}`}
      style={{
        width,
        height,
        ...sx,
      }}
      {...props}
    />
  );
}
