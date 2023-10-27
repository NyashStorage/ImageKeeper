const path = require('path');

module.exports = {
  reactStrictMode: false,
  transpilePackages: ['ui'],
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'node_modules/ui/src/assets/styles'),
      path.join(__dirname, 'node_modules/ui/src/assets/styles/*'),
      path.join(__dirname, 'node_modules/ui/src/assets/styles/*/*'),
    ],
  },
};
