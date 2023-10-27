import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactElement,
} from 'react';
import type { CssProps } from '../utils/helpers/style.helpers';

// Types
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'large'
  | 'default'
  | 'small';

export interface TypographyProps
  extends HTMLAttributes<HTMLHeadingElement>,
    CssProps {
  variant?: TypographyVariant;

  textAlign?: CSSProperties['textAlign'];
}

// Helpers
const defaultElements: Record<string, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'big',
  default: 'p',
  small: 'small',
};

export function Typography({
  variant = 'default',
  textAlign,
  children,
  sx = {},
  ...props
}: TypographyProps): ReactElement {
  const Element = defaultElements[variant];

  return (
    <Element
      style={{
        textAlign,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Element>
  );
}
