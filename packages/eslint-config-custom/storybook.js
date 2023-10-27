module.exports = {
  extends: ['./next', 'plugin:storybook/recommended'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/require-await': 'off',
    'unicorn/filename-case': 'off',
  },
};
