import { LoadingImageGroup } from 'ui';
import { withDefaults } from '../../../utils/helpers/story.helpers.tsx';

const meta = {
  component: LoadingImageGroup,
  title: 'Components/Images/ImageGroup/LoadingImageGroup',
  parameters: { layout: 'padded' },
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();
