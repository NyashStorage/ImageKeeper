import { CloseButton } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: CloseButton,
  title: 'Components/Buttons/CloseButton',
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const WithTitle = createStory({
  children: 'Close window',
});

export const Disabled = createStory({
  disabled: true,
});
