import { Notification } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';

const meta = {
  component: Notification,
  title: 'Components/Notification',
};
export default meta;

const createStory = withDefaults(meta, {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
});

export const Default = createStory();

export const Info = createStory({ variant: 'info' });

export const Success = createStory({ variant: 'success' });

export const Warning = createStory({ variant: 'warning' });

export const Error = createStory({ variant: 'error' });
