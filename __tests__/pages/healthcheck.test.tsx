import React from 'react';

import HealthCheck from '../../src/pages/health-check';
import { render, screen } from '../../test.render';

describe('Expect Health Check Page', () => {
    it('to render successfully', async () => {
        render(<HealthCheck />);
        expect(screen.getByTestId('go-city')).toBeInTheDocument();
        expect(screen.getByTestId('go-city')).toHaveTextContent('Success');
    });
});
