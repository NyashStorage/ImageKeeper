import { Typography } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';

const meta = {
  component: Typography,
  title: 'Components/Typography',
};
export default meta;

const createStory = withDefaults(meta, { children: 'Lorem ipsum dolor' });

export const Heading1 = createStory({ variant: 'h1' });

export const Heading2 = createStory({ variant: 'h2' });

export const Heading3 = createStory({ variant: 'h3' });

export const Large = createStory({ variant: 'large' });

export const Default = createStory();

export const Small = createStory({ variant: 'small' });
