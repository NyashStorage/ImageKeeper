import type { ComponentType, ElementType, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from 'ui';

/**
 * Gets a story generator with standard arguments for all stories.
 */
export function withDefaults<T, C extends ComponentType<T>, M extends Meta<C>>(
  meta: M,
  defaultStoryArgs?: Partial<StoryObj<M>['args']>,
): (storyArgs?: Partial<StoryObj<M>['args']>) => StoryObj<M> {
  const story = {
    args: defaultStoryArgs || {},
  } as StoryObj<typeof meta>;

  return (storyArgs) => ({
    ...story,
    args: { ...(story.args || {}), ...(storyArgs || {}) },
  });
}

/**
 * Wraps story content in a "body" similar to frontend part for correct display.
 */
export const withBody = (Story: ElementType): ReactElement => (
  <Stack BaseElement="body" direction="column" gap="3em">
    <Story />
  </Stack>
);
