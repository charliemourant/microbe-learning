import { createSlice } from '@reduxjs/toolkit';

import { ModalTypes } from '../../../enums/ModalTypes';
import { modalActions } from './actions';

export const initialState = {
    activeModal: ModalTypes.None,
};

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(modalActions.setActiveModal, (state, { payload }) => {
            state.activeModal = payload;
        });
    },
});

export default modalSlice.reducer;
