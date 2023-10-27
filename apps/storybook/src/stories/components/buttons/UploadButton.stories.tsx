import { UploadButton } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: UploadButton,
  title: 'Components/Buttons/UploadButton',
};
export default meta;

const createStory = withDefaults(meta, { children: 'Upload image' });

export const Default = createStory();

export const Disabled = createStory({
  disabled: true,
});
