import { ImageCounter } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: ImageCounter,
  title: 'Components/Images/ImageCounter',
};
export default meta;

const createStory = withDefaults(meta, {
  imageCount: 0,
  fetchImageCount: async () => 0,
});

export const Default = createStory();

export const WithValue = createStory({
  imageCount: 777,
});
