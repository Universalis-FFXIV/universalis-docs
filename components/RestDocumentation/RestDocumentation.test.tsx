import { render, screen } from '@testing-library/react';
import { RestDocumentation } from './RestDocumentation';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<RestDocumentation />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/theming/next/'
    );
  });
});
