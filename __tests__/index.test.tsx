import { render, screen } from '@testing-library/react';

import Home from '../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a next.js logo', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Anagram Solver/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
