module.exports = {
  extends: 'airbnb-base',
  plugins: ['import', 'react'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-restricted-syntax': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'guard-for-in': 'off',
  },
};
