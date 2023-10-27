import type { HTMLAttributes, ReactElement } from 'react';
import type { CssProps } from '../../utils/helpers/style.helpers';

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    CssProps {
  disabled?: boolean;
}

export function Button({ sx, children, ...props }: ButtonProps): ReactElement {
  return (
    <button style={sx} type="button" {...props}>
      {children}
    </button>
  );
}
