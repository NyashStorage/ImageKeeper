import type { Meta } from '@storybook/react';
import { AuthorizationModal } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta: Meta = {
  component: AuthorizationModal,
  title: 'Components/Modal/AuthorizationModal',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const createStory = withDefaults(meta, { visible: true });

export const Default = createStory();
