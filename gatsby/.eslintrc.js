module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    __PATH_PREFIX__: true,
    __adroll: true,
  },
  extends: ['react-app', 'airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['jsx-a11y'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['Input'],
        depth: 3,
      },
    ],
    'react/jsx-sort-props': 'warn',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
