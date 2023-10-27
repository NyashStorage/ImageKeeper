import { LoadingHeader } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: LoadingHeader,
  title: 'Sections/Header/LoadingHeaderSection',
  parameters: { layout: 'padded' },
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();
