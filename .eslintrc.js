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
  extends: [
    'react-app',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'prettier/prettier': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/no-danger': 'off',
    'react/prop-types': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
