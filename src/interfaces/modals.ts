import { FunctionComponent } from 'react';

export interface IModal {
    modal: FunctionComponent;
    id: number;
}

export interface IModals {
    modals: Array<IModal>;
}
