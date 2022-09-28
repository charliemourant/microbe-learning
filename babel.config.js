module.exports = {
    presets: [
        [
            'next/babel',
            {
                'preset-env': {
                    targets: {
                        browsers: ['defaults', 'not IE>0', '>2%'],
                    },
                },
                'transform-runtime': {
                    absoluteRuntime: true,
                    version: '3',
                    regenerator: true,
                },
            },
            '@babel/preset-typescript',
        ],
    ],
    plugins: [
        [
            'styled-components',
            {
                minify: true,
                pure: true,
                ssr: true,
                displayName: true,
                preprocess: false,
            },
        ],
    ],
};
