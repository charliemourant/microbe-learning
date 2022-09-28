import { Button } from '@marco-polo/button';
import styled from 'styled-components';

export const Heading = styled.h2<{ theme }>`
    color: ${({ theme }) => theme.colors.primary};
    padding: 1.5625rem 0;
    margin: 0;
    border-radius: 0.625rem 0.625rem 0 0;
`;

export const StyledButton = styled(Button)`
    display: inline-block;
    margin: 0.625rem 1.25rem 1.25rem 0;
    width: 30%;
`;
