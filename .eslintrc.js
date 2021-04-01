module.exports = {
  globals: {
    setTimeout: true,
  },
  root: true,
  extends: ['@react-native-community', 'eslint', 'plugin:react-hooks/recommended', "plugin:@typescript-eslint/recommended"],
  plugins: ['prettier', 'react', 'react-hooks'],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 2021
  },

  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
};