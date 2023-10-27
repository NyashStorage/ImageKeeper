import { Card } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';

const meta = {
  component: Card,
  title: 'Components/Card',
};
export default meta;

const createStory = withDefaults(meta, {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
});

export const Default = createStory();

export const Elevation0 = createStory({ elevation: 0 });

export const Elevation1 = createStory({ elevation: 1 });

export const Elevation2 = createStory({ elevation: 2 });

export const Elevation3 = createStory({ elevation: 3 });

export const Elevation4 = createStory({ elevation: 4 });

export const Elevation5 = createStory({ elevation: 5 });
