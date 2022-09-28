import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalTypes } from '../../enums/ModalTypes';
import { modalActions } from '../../store/slices/modals/actions';
import { StyledButton, Heading } from './styles';

const BasicModal = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(modalActions.setActiveModal(ModalTypes.None));
        // perform action here
    };

    return (
        <>
            <Heading>This is a modal</Heading>
            <p>Update your content</p>
            <StyledButton type="button" data-e2e="confirmDeleteOption" onClick={() => handleClick()}>
                Action Button
            </StyledButton>
        </>
    );
};

export default BasicModal;
