import { Image } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';
import { MOCK_IMAGE_URL } from '../../utils/constants/mock.constants.ts';

const meta = {
  component: Image,
  title: 'Components/Images/Image',
};
export default meta;

const createStory = withDefaults(meta, {
  url: MOCK_IMAGE_URL,
  width: '30vw',
});

export const Default = createStory();
