/* eslint-env node */
const formatCommand = 'prettier --write';
const eslintCommand = 'eslint --fix';

module.exports = {
  '*.{js,ts}': [formatCommand, eslintCommand],
};
