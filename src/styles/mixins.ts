import { css } from 'styled-components';

export const AspectRatio = ({ width, height }) => css`
    aspect-ratio: width / height;

    @supports not (aspect-ratio: 1 / 1) {
        :before {
            content: '';
            float: left;
            padding-bottom: ${() => (height / width) * 100}%;
        }

        :after {
            content: '';
            display: block;
            clear: both;
        }
    }
`;
