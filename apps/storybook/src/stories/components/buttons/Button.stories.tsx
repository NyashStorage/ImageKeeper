import { Button } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: Button,
  title: 'Components/Buttons/Button',
};
export default meta;

const createStory = withDefaults(meta, { children: 'Button' });

export const Default = createStory();

export const Disabled = createStory({
  disabled: true,
});
