import '../assets/styles/components/_card.scss';

import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { CssProps } from '../utils/helpers/style.helpers';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CssProps {
  elevation?: number;
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
}

export function Card({
  elevation = 1,
  minWidth,
  maxWidth,
  className = '',
  sx = {},
  children,
  ...props
}: CardProps): ReactElement {
  const cardClasses = `card box-shadow-${elevation} ${className}`;

  return (
    <div
      className={cardClasses}
      style={{
        minWidth,
        maxWidth,
        ...sx,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
