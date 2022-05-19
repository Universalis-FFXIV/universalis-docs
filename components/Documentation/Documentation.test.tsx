import { render, screen } from '@testing-library/react';
import { Documentation } from './Documentation';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Documentation />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/theming/next/'
    );
  });
});
