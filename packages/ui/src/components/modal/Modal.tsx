import '../../assets/styles/components/modal/_modal.scss';

import type { ReactElement } from 'react';
import type { CssProps } from '../../utils/helpers/style.helpers';
import { CloseButton } from '../buttons/CloseButton';
import { ConfirmButton } from '../buttons/ConfirmButton';
import type { StackProps } from '../Stack';
import { Stack } from '../Stack';
import { FadeIn } from '../FadeIn';

export interface ModalProps extends StackProps, CssProps {
  visible?: boolean;

  closeButtonTitle?: string;
  confirmButtonTitle?: string;

  onConfirm?: () => void;
  onClose?: () => void;
}

export function Modal({
  visible = false,

  closeButtonTitle,
  confirmButtonTitle,

  onConfirm = () => {},
  onClose = () => {},

  className = '',
  sx = {},
  children,
  ...props
}: ModalProps): ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
  };

  return (
    <FadeIn visible={visible}>
      <Stack
        BaseElement="aside"
        className={`modal ${className}`}
        style={{
          gap: '2.5em',
          ...sx,
        }}
        {...props}
      >
        <CloseButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 'calc(1vw + 1vh)',
            right: 'calc(1vw + 1vh)',
          }}
        >
          {closeButtonTitle}
        </CloseButton>

        {children}

        <ConfirmButton onClick={handleConfirm}>
          {confirmButtonTitle}
        </ConfirmButton>
      </Stack>
    </FadeIn>
  );
}
