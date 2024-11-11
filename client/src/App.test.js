import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// sanity check
test('renders login button when not authenticated', () => {
  render(<App />);
  const loginButton = screen.getByText(/Log In/i);
  expect(loginButton).toBeInTheDocument();
});