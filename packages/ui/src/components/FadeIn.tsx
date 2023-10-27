'use client';

import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';

export interface FadeInProps extends PropsWithChildren {
  visible: boolean;

  onHided?: () => void;
}

export function FadeIn({
  visible,
  onHided = () => {},
  children,
}: FadeInProps): ReactElement {
  const [hidden, setHidden] = useState(!visible);

  useEffect(() => {
    if (!visible) return;
    setHidden(false);
  }, [visible]);

  const animationHandler = (): void => {
    if (visible) return;

    setHidden(true);
    onHided();
  };

  const processChildrens = (child: ReactNode): ReactNode => {
    if (isValidElement(child)) {
      const existingClassName = (child.props.className as string) || '';

      return cloneElement(child, {
        className: `${existingClassName} ${
          visible ? 'fade-in' : 'fade-out hidden'
        } ${hidden ? 'hide' : ''}`.trim(),
        onAnimationEnd: animationHandler,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return child;
  };

  return <>{Children.map(children, processChildrens)}</>;
}
