import type { Meta } from '@storybook/react';
import { EditorModal } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';
import { MOCK_IMAGE_URL } from '../../utils/constants/mock.constants.ts';

const meta: Meta = {
  component: EditorModal,
  title: 'Components/Modal/EditorModal',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const createStory = withDefaults(meta, {
  visible: true,
  imageUrl: MOCK_IMAGE_URL,
});

export const Default = createStory();

export const WithImageTitle = createStory({
  imageTitle: 'By NyashMyash99',
});
