import moment from 'moment';
import { ImageGroup } from 'ui';
import { withDefaults } from '../../../utils/helpers/story.helpers.tsx';
import {
  MOCK_IMAGES,
  MOCK_USER,
} from '../../../utils/constants/mock.constants.ts';

const meta = {
  component: ImageGroup,
  title: 'Components/Images/ImageGroup/ImageGroup',
  parameters: { layout: 'padded' },
};
export default meta;

const createStory = withDefaults(meta, {
  title: moment().format('MMMM D'),
  images: MOCK_IMAGES,
  user: MOCK_USER,
});

export const Default = createStory();
