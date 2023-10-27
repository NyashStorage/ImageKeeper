import { Skeleton } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';

const meta = {
  component: Skeleton,
  title: 'Components/Skeleton',
};
export default meta;

const createStory = withDefaults(meta, {
  width: '335px',
  height: '200px',
});

export const Default = createStory();

export const Elevation0 = createStory({ elevation: 0 });

export const Elevation1 = createStory({ elevation: 1 });

export const Elevation2 = createStory({ elevation: 2 });

export const Elevation3 = createStory({ elevation: 3 });

export const Elevation4 = createStory({ elevation: 4 });

export const Elevation5 = createStory({ elevation: 5 });
