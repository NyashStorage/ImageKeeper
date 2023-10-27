import { PasswordInput } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: PasswordInput,
  title: 'Components/Inputs/PasswordInput',
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const Disabled = createStory({
  disabled: true,
  value: 'Input is disabled',
});

export const WithPlaceholder = createStory({
  placeholder: 'Write password here',
});

export const WithDefaultValue = createStory({
  placeholder: 'Write password here',
  defaultValue: 'Some value',
});

export const Short = createStory({
  placeholder: 'Write text here',
  width: '50%',
});
