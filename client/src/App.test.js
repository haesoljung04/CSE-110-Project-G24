import { render, screen } from '@testing-library/react';
import App from './App';


// sanity check
test('renders login button when not authenticated', () => {
  render(<App />);
  const loginButton = screen.getByText(/Log In/i);
  expect(loginButton).toBeInTheDocument();
});