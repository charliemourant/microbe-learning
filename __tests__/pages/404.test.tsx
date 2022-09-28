import React from 'react';

import Custom404 from '../../src/pages/404';
import { render, screen } from '../../test.render';

describe('Expect Health Check Page', () => {
    it('to render successfully', async () => {
        render(<Custom404 />);
        expect(screen.getByTestId('custom-404-page')).toBeInTheDocument();
        expect(screen.getByTestId('custom-404-page')).toHaveTextContent('404 - Page Not Found');
    });
});
