module.exports = {
    extends: [
        'eslint:recommended',
        'next',
        'next/core-web-vitals',
        'plugin:jest-dom/recommended',
        'plugin:cypress/recommended',
        'plugin:prettier/recommended',
    ],
    globals: {
        __static: true,
        cy: true,
    },
    plugins: ['prettier', 'jest-dom'],
    rules: {
        'prettier/prettier': 'error',
        'max-len': [
            2,
            {
                code: 120,
                ignoreComments: true,
                ignoreUrls: true,
            },
        ],
        '@next/next/no-img-element': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-fragments': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-first-prop-new-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/display-name': 1,
        'react/prefer-stateless-function': 0,
        'react/state-in-constructor': 0,
        'react/jsx-curly-newline': 0,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'jsx-a11y/accessible-emoji': 0,
        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                aspects: ['invalidHref'],
            },
        ],
        'import/extensions': 'off',
        'comma-dangle': 0,
        'no-underscore-dangle': 'off',
        'one-var': 'off',
        'no-return-assign': 'off',
        'no-use-before-define': 'off',
        'class-methods-use-this': 'off',
        'import/no-named-as-default-member': 'off',
        'object-curly-spacing': [2, 'always'],
        semi: ['error', 'always'],
        'no-unused-vars': [
            1,
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: 'res|next|^err|^_',
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        'no-unused-expressions': [
            2,
            {
                allowTaggedTemplates: true,
            },
        ],
        'no-param-reassign': [
            2,
            {
                props: false,
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
            { blankLine: 'always', prev: 'function', next: '*' },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'no-console': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'consistent-return': 0,
        curly: [2, 'multi-line'],
        'arrow-body-style': [2, 'as-needed'],
        camelcase: 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
    },
    overrides: [
        {
            files: '**/*.+(ts|tsx)',
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint/eslint-plugin'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
            },
        },
        {
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
};
