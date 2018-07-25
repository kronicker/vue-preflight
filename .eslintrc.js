const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    extends: 'standard',
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    },
    env: {
      es6: true
    },
    rules: {
      // allow paren-less arrow functions
      'arrow-parens': 'off',
      // warn if there is a trailing comma
      'comma-dangle': ['warn', 'never'],
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': isDev ? 'warn' : 'error',
      // allow dead code during development
      'no-unreachable': isDev ? 'warn' : 'error',
      // semicolons are necessary
      'semi': ['warn', 'always'],
      // add space before function parameters
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never'
      }],
      'sort-imports': ['error', {
        ignoreCase: true,
        ignoreMemberSort: false
      }]
    }
  }
