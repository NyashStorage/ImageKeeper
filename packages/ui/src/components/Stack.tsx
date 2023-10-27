import '../assets/styles/components/_stack.scss';

import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactElement,
} from 'react';
import type { CssProps } from '../utils/helpers/style.helpers';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, CssProps {
  BaseElement?: ElementType;

  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
}

export function Stack({
  direction = 'row',
  gap = 0,

  BaseElement = 'div',

  className = '',
  sx = {},
  children,
  ...props
}: StackProps): ReactElement {
  return (
    <BaseElement
      className={`stack ${className}`}
      style={{
        flexDirection: direction,
        gap,
        ...sx,
      }}
      {...props}
    >
      {children}
    </BaseElement>
  );
}
