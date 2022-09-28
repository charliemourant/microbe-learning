import React from 'react';

import HomePage from '../../src/pages';
import { render, screen } from '../../test.render';

describe('Expect Home Page', () => {
    it('to render successfully', async () => {
        render(<HomePage exampleProp="Test" />);
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
