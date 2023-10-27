import { ImageGroups } from 'ui';
import {
  withBody,
  withDefaults,
} from '../../../utils/helpers/story.helpers.tsx';
import {
  MOCK_IMAGES,
  MOCK_USER,
} from '../../../utils/constants/mock.constants.ts';

const meta = {
  component: ImageGroups,
  title: 'Components/Images/ImageGroup/ImageGroups',
  parameters: { layout: 'fullscreen' },
  decorators: [withBody],
};
export default meta;

const createStory = withDefaults(meta, {
  images: MOCK_IMAGES,
  user: MOCK_USER,
  fetchMoreImages: async () => {},
});

export const Default = createStory();
