import { HomePage } from 'ui';
import { withBody, withDefaults } from '../utils/helpers/story.helpers.tsx';
import { MOCK_IMAGES, MOCK_USER } from '../utils/constants/mock.constants.ts';

const meta = {
  component: HomePage,
  title: 'Pages/HomePage',
  parameters: { layout: 'fullscreen' },
  decorators: [withBody],
};
export default meta;

const createStory = withDefaults(meta, {
  images: MOCK_IMAGES,
  imageCount: 0,
  fetchImageCount: async () => 0,
  fetchMoreImages: async () => {},
});

export const Default = createStory();

export const Authorized = createStory({
  user: MOCK_USER,
  imageCount: 777,
});
