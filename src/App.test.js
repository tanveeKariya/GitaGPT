import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GitaGPT title', () => {
  render(<App />);
  const titleElement = screen.getByText(/GitaGPT/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome, My dear child/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders input placeholder', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Seek divine guidance/i);
  expect(inputElement).toBeInTheDocument();
});