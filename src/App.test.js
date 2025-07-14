import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

test("renders puzzle game", () => {
  render(<App />);
  const gameTitle = screen.getByText(/EchoBot Puzzle/i);
  expect(gameTitle).toBeInTheDocument();
});
