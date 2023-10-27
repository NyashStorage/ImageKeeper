import { Header } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: Header,
  title: 'Sections/Header/HeaderSection',
  parameters: { layout: 'padded' },
};
export default meta;

const createStory = withDefaults(meta, {
  imageCount: 0,
  fetchImageCount: async () => 0,
});

export const Default = createStory();
