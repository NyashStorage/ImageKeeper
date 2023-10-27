import { AuthorizationButton } from 'ui';
import { withDefaults } from '../../utils/helpers/story.helpers.tsx';

const meta = {
  component: AuthorizationButton,
  title: 'Components/Buttons/AuthorizationButton',
};
export default meta;

const createStory = withDefaults(meta);

export const Default = createStory();

export const Disabled = createStory({
  disabled: true,
});

export const Authorized = createStory({
  email: 'contact@nyashmyash99.ru',
});

export const DisabledAuthorized = createStory({
  email: 'contact@nyashmyash99.ru',
  disabled: true,
});
