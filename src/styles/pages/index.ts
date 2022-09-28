import styled from 'styled-components';

export const Wrapper = styled.section``;

export const Header = styled.header`
    display: flex;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};

    img {
        width: 8.75rem;
        padding: 1.25rem;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 80rem;
    background: ${({ theme }) => theme.colors.white};
    margin: 1.25rem auto;
    padding: 1.25rem;
    height: 100%;

    button {
        margin-top: 1.25rem;
    }
`;
