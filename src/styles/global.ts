import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ theme }>`
    // IE unsupported message
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        body { display: block!important; overflow: hidden; }
        #browserSupport { display: flex; }
    }
`;

export const Main = styled.main`
    width: 100%;
    margin: 0 auto;
`;

export const VisuallyHidden = styled.span`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 0.0625rem;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 0.0625rem;
`;
