import { UploadModal } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: UploadModal,
  title: 'Components/Modal/UploadModal',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const createStory = withDefaults(meta, {
  visible: true,
});

export const Default = createStory();
