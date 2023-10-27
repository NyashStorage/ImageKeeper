'use client';
import '../../assets/styles/components/inputs/_password-input.scss';

import type { ReactElement } from 'react';
import { useState } from 'react';
import { BiHide as HideIcon, BiShow as ShowIcon } from 'react-icons/bi';
import type { IconedInputProps } from './IconedInput';
import { IconedInput } from './IconedInput';

export function PasswordInput(props: IconedInputProps): ReactElement {
  const [textVisibility, setTextVisibility] = useState(false);

  return (
    <IconedInput
      {...props}
      className="input--password"
      endIcon={
        textVisibility ? (
          <ShowIcon onClick={() => setTextVisibility(false)} />
        ) : (
          <HideIcon onClick={() => setTextVisibility(true)} />
        )
      }
      type={textVisibility ? 'text' : 'password'}
    />
  );
}
