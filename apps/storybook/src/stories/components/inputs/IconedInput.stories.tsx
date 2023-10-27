import { CgDebug as TestIcon } from 'react-icons/cg';
import { IconedInput } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: IconedInput,
  title: 'Components/Inputs/IconedInput',
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const Disabled = createStory({
  disabled: true,
  value: 'Input is disabled',
});

export const WithPlaceholder = createStory({
  placeholder: 'Write text here',
});

export const WithDefaultValue = createStory({
  defaultValue: 'Some value',
});

export const WithIcon = createStory({
  startIcon: <TestIcon />,
  endIcon: <TestIcon />,
});

export const Centered = createStory({
  placeholder: 'Write text here',
  defaultValue: 'Some value',
  textAlign: 'center',
});

export const Short = createStory({
  placeholder: 'Write text here',
  width: '50%',
});
