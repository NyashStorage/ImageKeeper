import { AuthorizationSection } from 'ui';
import { withDefaults } from '../utils/helpers/story.helpers.tsx';
import { MOCK_USER } from '../utils/constants/mock.constants.ts';

const meta = {
  component: AuthorizationSection,
  title: 'Sections/AuthorizationSection',
  parameters: { layout: 'padded' },
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const Authorized = createStory({
  user: MOCK_USER,
});
