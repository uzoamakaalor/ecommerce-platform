import { render, screen } from '@testing-library/react';
import App from './App';

test('renders e-commerce link', () => {
  render(<App />);
  const linkElement = screen.getByText(/E-Commerce/i);
  expect(linkElement).toBeInTheDocument();
});