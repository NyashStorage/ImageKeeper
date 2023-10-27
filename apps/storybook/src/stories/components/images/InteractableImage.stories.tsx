import { InteractableImage, randomInt } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';
import { MOCK_IMAGE_URL } from '../../utils/constants/mock.constants.ts';

const meta = {
  component: InteractableImage,
  title: 'Components/Images/InteractableImage',
};
export default meta;

const createStory = withDefaults(meta, {
  title: 'Photo title',
  url: MOCK_IMAGE_URL,
  isOwned: true,
});

export const Default = createStory();

export const Short = createStory({ variant: 'short' });

export const Unowned = createStory({ isOwned: false });

export const Uploading = createStory({
  state: 'uploading',
  loadedBytes: randomInt(100000, 1000000),
  byteSize: randomInt(1000000, 3000000),
});
