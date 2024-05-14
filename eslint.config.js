const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');
const prettier = require('eslint-plugin-prettier');
const typescriptEslintParser = require('@typescript-eslint/parser');
const codecc = require('eslint-plugin-codecc');
const perfectionist = require('eslint-plugin-perfectionist');
const tencentEslintLegacyRules = require('eslint-config-tencent/ts').rules;

// Deprecate formatting rules https://typescript-eslint.io/blog/deprecating-formatting-rules
const deprecateRules = Object.fromEntries(
  [
    'ban-ts-comment',
    'block-spacing',
    'brace-style',
    'comma-dangle',
    'comma-spacing',
    'func-call-spacing',
    'indent',
    'key-spacing',
    'keyword-spacing',
    'lines-around-comment',
    'lines-between-class-members',
    'member-delimiter-style',
    'no-explicit-any',
    'no-extra-parens',
    'no-extra-semi',
    'padding-line-between-statements',
    'quotes',
    'semi',
    'space-before-blocks',
    'space-before-function-paren',
    'space-infix-ops',
    'type-annotation-spacing',
    'no-misused-promises',
  ].map(rule => [`@typescript-eslint/${rule}`, 'off']),
);
module.exports = [
  {
    plugins: { prettier },
    rules: { ...prettier.configs.recommended.rules },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.js'],
    ignores: ['src/**/*.tsx'],
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'decorated-accessor-property',
            'static-private-method',
            'private-property',
            'static-property',
            'index-signature',
            'private-method',
            'static-method',
            'property',
            'private-decorated-accessor-property',
            'private-decorated-property',
            'decorated-property',
            'constructor',
            ['get-method', 'set-method'],
            'decorated-set-method',
            'decorated-get-method',
            'decorated-method',
            'unknown',
            'method',
          ],
          order: 'asc',
          type: 'natural',
        },
      ],
      // 'perfectionist/sort-objects': [
      //   'error',
      //   {
      //     'custom-groups': {
      //       ID: '*(id|ID|Id)',
      //       NAME: '*(name|Name|NAME)',
      //       path: 'path',
      //       // components: 'components',
      //       // directives: 'directives',
      //       // emits: 'emits',
      //       // props: 'props',
      //       // setup: 'setup',
      //       // render: 'render',
      //     },
      //     groups: ['ID', 'NAME', 'path', 'unknown'],
      //     order: 'asc',
      //     'partition-by-comment': 'Part:**',
      //     type: 'natural',
      //   },
      // ],
    },
  },
  {
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-enums': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          'custom-groups': {
            CLASS: '*(class|ext-cls|extCls)',
            DEFINITION: 'is',
            DIRECTIVE: 'v-*',
            EVENTS: '*(on*|v-on)',
            GLOBAL: 'id',
            SLOT: '*(v-slot|slot)',
            STYLE: '*style',
            TWO_WAY_BINDING: '*(v-model|vModel)',
            UNIQUE: '*(ref|key)',
            WIDTH: 'width',
            HEIGHT: 'height',
          },
          groups: [
            'DEFINITION',
            'GLOBAL',
            'UNIQUE',
            'STYLE',
            'WIDTH',
            'HEIGHT',
            'CLASS',
            'TWO_WAY_BINDING',
            'SLOT',
            'DIRECTIVE',
            'multiline',
            'unknown',
            'shorthand',
            'EVENTS',
          ],
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-maps': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'top',
            'vueI18n',
            'magicBox',
            'tsxSupport',
            ['builtin', 'external'],
            ['internal', 'sibling', 'parent', 'side-effect', 'index', 'object'],
            'unknown',
            ['type', 'builtin-type', 'external-type', 'internal-type', 'parent-type', 'sibling-type', 'index-type'],
            ['style', 'side-effect-style'],
          ],
          'custom-groups': {
            value: {
              top: ['./public-path', './public-path.ts', 'monitor-common/polyfill'],
              vueI18n: ['./i18n/i18n', 'vue', 'vue-*'],
              magicBox: ['./common/import-magicbox-ui', 'monitor-ui/directive/index', 'monitor-static/svg-icons'],
              tsxSupport: ['vue-property-decorator', 'vue-tsx-support'],
            },
            type: {
              top: 'top',
              vueI18n: 'vueI18n',
              magicBox: 'magicBox',
              tsxSupport: 'tsxSupport',
            },
          },
          'newlines-between': 'always',
          'internal-pattern': ['@/*', '@router/*', '@store/*', '@page/*', '@static/*'],
        },
      ],
      // 'perfectionist/sort-intersection-types': [
      //   'error',
      //   {
      //     type: 'natural',
      //     order: 'asc',
      //   },
      // ],
      'perfectionist/sort-union-types': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: { jsx: true, legacyDecorators: true },
        ecmaVersion: 'latest',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      // codecc,
    },
    rules: {
      //       'codecc/license': [
      //         'error',
      //         {
      //           license: `/*
      // * Tencent is pleased to support the open source community by making
      // * 蓝鲸智云PaaS平台 (BlueKing PaaS) available.
      // *
      // * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
      // *
      // * 蓝鲸智云PaaS平台 (BlueKing PaaS) is licensed under the MIT License.
      // *
      // * License for 蓝鲸智云PaaS平台 (BlueKing PaaS):
      // *
      // * ---------------------------------------------------
      // * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
      // * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
      // * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
      // * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      // *
      // * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
      // * the Software.
      // *
      // * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
      // * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      // * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
      // * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      // * IN THE SOFTWARE.
      // */\n`,
      //           pattern: '.*Tencent is pleased to support the open source community.+',
      //         },
      //       ],
      ...typescriptEslint.configs.recommended.rules,
      ...tencentEslintLegacyRules,
      ...deprecateRules,
    },
  },
  eslintConfigPrettier,
  {
    ignores: [
      'node_modules',
      'src/**/dist',
      '/lib',
      '/dev',
      '/docs',
      '/plugins',
      '/src/__tests__/demos',
      'src/**/.config',
    ],
  },
];
