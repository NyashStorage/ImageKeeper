import { ConfirmButton } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: ConfirmButton,
  title: 'Components/Buttons/ConfirmButton',
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const WithTitle = createStory({
  children: 'Save',
});

export const Disabled = createStory({
  disabled: true,
});
