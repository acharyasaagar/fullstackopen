module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'arrow-spacing': ['error', { before: true, after: true }],
    eqeqeq: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 0,
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
