const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    verbose: true,
    automock: false,
    resetMocks: false,
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
            'ts-jest',
            { presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'] },
        ],
    },
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    globals: {
        NODE_ENV: 'test',
        window: {},
        'ts-jest': {
            tsconfig: {
                jsx: 'react',
            },
        },
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^./react': path.resolve(__dirname, 'node_modules/react'),
        '^./react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        '^./prop-types': path.resolve(__dirname, 'node_modules/prop-types'),
        '^./styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', 'styles.js', 'styles.tsx'],
    coverageReporters: ['json', 'html', 'text', 'lcov'],
    coverageProvider: 'v8',
    coverageDirectory: './jest-coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        './src/pages/**/*.(js|jsx|ts|tsx)',
        './src/store/ducks/**/*.(js|jsx|ts|tsx)',
        './src/components/**/*.(js|jsx|ts|tsx)',
        './src/store/slices/**/*.(js|jsx|ts|tsx)',
        './src/utils/**/*.(js|jsx|ts|tsx)',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!./src/pages/api/**/*.(ts|js)',
        '!./src/pages/**/_app.tsx',
        '!./src/pages/**/_error.tsx',
        '!./src/pages/**/_document.tsx',
        '!./src/components/Portal.tsx',
        '!./src/utils/redirectUser.ts',
        '!./src/utils/isProduction.ts',
        '!./**/styles.(js|jsx|ts|tsx)',
        '!./**/thunk.(js|jsx|ts|tsx)',
    ],
};
