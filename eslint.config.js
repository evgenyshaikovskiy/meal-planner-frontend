// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: ['.angular/**', '.nx/**', 'coverage/**', 'dist/**'],
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      prettierConfig,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // decorators first
            'public-decorated-field', // @Input, @Output, @ViewChild, etc.
            'protected-decorated-field',
            'private-decorated-field',

            // for fields start with privates, as they could be injected(services, etc)
            'private-field',
            'protected-field',
            'public-field',

            // Statics
            'public-static-field',
            'private-static-field',
            'public-static-method',
            'private-static-method',

            // Properties

            // Constructors
            'constructor',

            // Lifecycle hooks (ngOnInit, ngOnDestroy, etc.)
            'method', // This catches all non-static methods if not specified further, but we'll prioritize specific ones later

            // Accessors (getters/setters)
            'public-decorated-accessor',
            'public-accessor',
            'protected-decorated-accessor',
            'protected-accessor',
            'private-decorated-accessor',
            'private-accessor',

            // Public Methods
            'public-method',

            // Protected Methods
            'protected-method',

            // Private Methods
            'private-method',
          ],
        },
      ],

      // Angular best practices
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',

      // TypeScript best practices
      '@typescript-eslint/array-type': ['warn'],
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      prettier: prettierPlugin,
      '@angular-eslint/template': angular.templatePlugin,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'html' }],
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'STRUCTURAL_DIRECTIVE', // deprecated, use @if and @for instead
            'TEMPLATE_REFERENCE', // e.g. `<input #inputRef>`
            'ATTRIBUTE_BINDING', // e.g. `<input required>`, `id="3"`
            'INPUT_BINDING', // e.g. `[id]="3"`, `[attr.colspan]="colspan"`,
            'TWO_WAY_BINDING', // e.g. `[(id)]="id"`,
            'OUTPUT_BINDING', // e.g. `(idChange)="handleChange()"`,
          ],
        },
      ],
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 5 }],
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
      '@angular-eslint/template/no-call-expression': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/no-inline-styles': 'warn',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
    },
  },
);
