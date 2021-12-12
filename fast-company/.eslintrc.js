module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: [0, 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    semi: [2, 'always'],
    quotes: ['error', 'double', { allowTemplateLiterals: true }],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'multiline-ternary': ['off']
  }
};