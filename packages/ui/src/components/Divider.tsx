import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { CssProps } from '../utils/helpers/style.helpers';

export interface DividerProps extends HTMLAttributes<HTMLHRElement>, CssProps {
  height?: CSSProperties['height'];
}

export function Divider({
  height,
  sx = {},
  ...props
}: DividerProps): ReactElement {
  return (
    <hr
      style={{
        height,
        ...sx,
      }}
      {...props}
    />
  );
}
