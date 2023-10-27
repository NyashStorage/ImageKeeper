import { Modal } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: Modal,
  title: 'Components/Modal/Modal',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const createStory = withDefaults(meta, {
  children: 'Text content',
  visible: true,
});

export const Default = createStory();

export const WithCloseTitle = createStory({
  closeButtonTitle: 'Close modal',
});

export const WithConfirmTitle = createStory({
  confirmButtonTitle: 'Save',
});
