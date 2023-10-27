import { Divider } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';

const meta = {
  component: Divider,
  title: 'Components/Divider',
};
export default meta;

const createStory = withDefaults(meta, {
  sx: { width: '100vw' },
});

export const Default = createStory();

export const Fat = createStory({ height: '3px' });
