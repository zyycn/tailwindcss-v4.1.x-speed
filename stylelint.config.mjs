export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'scss/dollar-variable-pattern': '^_?[a-zA-Z0-9\\-]+$',
    'custom-property-pattern': '^_?[a-zA-Z0-9\\-]+$|^[a-zA-Z0-9\\-]+_[a-zA-Z0-9\\-]+$',
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['theme'] }],
    'at-rule-no-deprecated': [true, { ignoreAtRules: ['apply'] }]
  },
  overrides: [
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: ['node_modules/**', 'dist/**', 'public/**', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md']
}
