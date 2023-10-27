'use client';
import '../../assets/styles/components/inputs/_iconed-input.scss';

import type {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { useState } from 'react';
import type { CssProps } from '../../utils/helpers/style.helpers';

export interface IconedInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>,
    CssProps {
  type?: 'text' | 'password';
  disabled?: boolean;
  required?: boolean;

  startIcon?: ReactNode;
  endIcon?: ReactNode;

  value?: HTMLAttributes<HTMLInputElement>['defaultValue'];
  defaultValue?: HTMLAttributes<HTMLInputElement>['defaultValue'];
  placeholder?: HTMLAttributes<HTMLInputElement>['placeholder'];

  width?: CSSProperties['width'];
  textAlign?: CSSProperties['textAlign'];

  onChange?: (value: string) => void;
}

export function IconedInput({
  type = 'text',
  disabled = false,
  required = false,

  startIcon = null,
  endIcon = null,

  value: propsValue = '',
  defaultValue = '',
  placeholder = '',

  width,
  textAlign,
  className = '',

  onChange = () => {},
  sx = {},
}: IconedInputProps): ReactElement {
  const [value, setValue] = useState(propsValue || defaultValue);

  const handleChange = (target: HTMLInputElement): void => {
    const { value: targetValue } = target;

    setValue(targetValue);
    onChange(targetValue);
  };

  return (
    <div className={`input ${className}`} style={{ width }}>
      {startIcon}

      <input
        disabled={disabled}
        onChange={({ target }) => handleChange(target)}
        placeholder={placeholder}
        required={required}
        style={{
          textAlign,
          ...sx,
        }}
        type={type}
        value={propsValue || value}
      />

      {endIcon}
    </div>
  );
}
