module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 0,
    'react/jsx-filename-extension': 0,
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'react/prefer-stateless-function': 0,
    'import/no-named-as-default': 0,
    'react/static-property-placement': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/state-in-constructor': 0,
    'react/no-unused-state': 0,
    'consistent-return': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/button-has-type': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'no-restricted-globals': 0,
    'react/sort-comp': 0,
    'react/no-access-state-in-setstate': 0,
    'no-param-reassign': 0,
    'array-callback-return': 0,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'react/no-children-prop': 0,
    'class-methods-use-this': 0,
    'no-shadow': 0,
    'no-prototype-builtins': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    radix: 0,
    'react/no-array-index-key': 0,
    'react/no-typos': 0,
    'no-unused-expressions': 0,
    'no-case-declarations': 0,
    'default-case': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'no-return-assign': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/no-unescaped-entities': 0,
    'prefer-destructuring': 0,
    'react/default-props-match-prop-types': 0,
    'guard-for-in': 0,
    'react/style-prop-object': 0,
    'no-cond-assign': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/no-redundant-roles': 0,
    'no-alert': 0,
    'vars-on-top': 0,
    'no-var': 0,
    'block-scoped-var': 0,
    'react/no-danger': 0,
    'global-require': 0,
    'func-names': 0,
    'import/order': 0,
    'default-param-last': 0,
    'react/jsx-no-useless-fragment': 0,
    'react/no-unused-class-component-methods': 0,
    'react/jsx-no-bind': 0,
    'no-unsafe-optional-chaining': 0,
    'no-dupe-else-if': 0,
    'default-case-last': 0,
    'react/no-unstable-nested-components': 0,
    'import/no-named-as-default-member': 0,
    'import/no-cycle': 0,
  },
}
