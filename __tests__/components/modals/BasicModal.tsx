import React from 'react';

import { screen } from '@testing-library/react';

import BasicModal from '../../../src/components/Modals/BasicModal';
import { ModalTypes } from '../../../src/enums/ModalTypes';
import { render } from '../../../test.render';

describe('<BasketModal>', () => {
    it('to render', async () => {
        render(<BasicModal />, {
            preloadedState: {
                modals: {
                    activeModal: ModalTypes.Basic,
                },
            },
        });

        expect(screen.getByText('This is a modal')).toBeInTheDocument();
        expect(screen.getByText('Update your content')).toBeInTheDocument();
        expect(screen.getByText('Button')).toBeInTheDocument();
    });
});
