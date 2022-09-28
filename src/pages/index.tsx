import React from 'react';

import { Button } from '@marco-polo/button';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';

import BasicModal from '../components/Modals/BasicModal';
import ModalContainer from '../components/Modals/ModalContainer';
import { ModalTypes } from '../enums/ModalTypes';
import { modalActions } from '../store/slices/modals/actions';
import { Wrapper, Header, Content } from '../styles/pages';

/* Add available modal components for this page here */
const modals = [
    {
        modal: BasicModal,
        id: ModalTypes.Basic,
    },
];

/* Set interfaces/types for your props */
interface HomePageProps {
    exampleProp: string;
}

/* Tell TypeScript what props to expect */
const HomePage: React.FC<HomePageProps> = ({ exampleProp }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(modalActions.setActiveModal(ModalTypes.Basic));
    };

    return (
        <Wrapper data-testid="home-page">
            <Header>
                <img src="/assets/img/go-city.webp" alt="Welcome to GoCity.com" />
            </Header>
            <Content>
                <>
                    <h1>{exampleProp}</h1>
                    <p>Use this as a boilerplate for any TypeScript enabled nextJS project</p>
                    <Button onClick={() => handleClick()}>Trigger Modal</Button>
                </>
            </Content>
            <ModalContainer modals={modals} />
        </Wrapper>
    );
};

/* Render data here on the server */
export const getServerSideProps: GetServerSideProps = async () => ({
    props: {
        exampleProp: 'Welcome to Microbe',
    },
});

export default HomePage;
