module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    semi: [1, 'never'],
    'space-before-function-paren': ["error", "never"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': [0, 'always']
  }
}
