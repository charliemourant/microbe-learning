import { createAction } from '@reduxjs/toolkit';

export const ns = 'modals';

const setActiveModal = createAction(`${ns}/setActiveModal`, function prepare(id: number) {
    return {
        payload: id,
    };
});

export const modalActions = {
    setActiveModal,
};
