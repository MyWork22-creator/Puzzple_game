import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PuzzleGame from "../PuzzleGame";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("PuzzleGame", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  test("renders game title and description", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("🧩 EchoBot Puzzle")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Navigate to the goal while the AI learns from your moves!"
      )
    ).toBeInTheDocument();
  });

  test("renders start game button initially", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("🚀 Start Game")).toBeInTheDocument();
  });

  test("renders game controls instructions", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("Controls:")).toBeInTheDocument();
    expect(
      screen.getByText("🎮 Arrow Keys or WASD to move")
    ).toBeInTheDocument();
    expect(screen.getByText("🔄 R to reset level")).toBeInTheDocument();
    expect(
      screen.getByText("🎯 Reach the goal (🎯) to win!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("🤖 Watch EchoBot learn from your moves!")
    ).toBeInTheDocument();
  });

  test("renders game legend", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("🎮 Game Elements:")).toBeInTheDocument();
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("EchoBot")).toBeInTheDocument();
    expect(screen.getByText("Goal")).toBeInTheDocument();
    expect(screen.getByText("Wall")).toBeInTheDocument();
    expect(screen.getByText("Both")).toBeInTheDocument();
  });

  test("shows initial game stats", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("Level:")).toBeInTheDocument();
    expect(screen.getByText("Moves:")).toBeInTheDocument();
    expect(screen.getByText("Efficiency:")).toBeInTheDocument();
    expect(screen.getByText("🤖 EchoBot Status")).toBeInTheDocument();
  });

  test("start button changes game state", () => {
    render(<PuzzleGame />);

    const startButton = screen.getByText("🚀 Start Game");
    fireEvent.click(startButton);

    // After starting, the start button should be replaced with reset button
    expect(screen.queryByText("🚀 Start Game")).not.toBeInTheDocument();
    expect(screen.getByText("🔄 Reset Level")).toBeInTheDocument();
  });

  test("displays EchoBot status for level 1", () => {
    render(<PuzzleGame />);

    expect(screen.getByText("🎲 Random Movement")).toBeInTheDocument();
  });

  test("renders game board", () => {
    render(<PuzzleGame />);

    // Check if game board container exists
    const gameBoard = document.querySelector(".game-board");
    expect(gameBoard).toBeInTheDocument();
  });

  test("keyboard event handling", () => {
    render(<PuzzleGame />);

    // Check if start button exists, if not the game is already started
    const startButton = screen.queryByText("🚀 Start Game");
    if (startButton) {
      fireEvent.click(startButton);
    }

    // Should have reset button after game starts
    expect(screen.getByText("🔄 Reset Level")).toBeInTheDocument();

    // Test keyboard events - these should not throw errors
    fireEvent.keyDown(window, { key: "ArrowUp" });
    fireEvent.keyDown(window, { key: "w" });
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "s" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "d" });
    fireEvent.keyDown(window, { key: "r" });

    // No errors should occur
    expect(screen.getByText("🔄 Reset Level")).toBeInTheDocument();
  });

  test("efficiency rating calculation", () => {
    render(<PuzzleGame />);

    // Initially should show N/A
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});

describe("Game Components Integration", () => {
  test("all game components render without errors", () => {
    const { container } = render(<PuzzleGame />);

    // Check if main game container exists
    expect(container.querySelector(".puzzle-game")).toBeInTheDocument();

    // Check if all major sections exist
    expect(container.querySelector(".game-header")).toBeInTheDocument();
    expect(container.querySelector(".game-ui")).toBeInTheDocument();
    expect(
      container.querySelector(".game-board-container")
    ).toBeInTheDocument();
    expect(container.querySelector(".game-instructions")).toBeInTheDocument();
  });

  test("responsive design classes are applied", () => {
    const { container } = render(<PuzzleGame />);

    const gameElement = container.querySelector(".puzzle-game");
    expect(gameElement).toHaveClass("puzzle-game");
  });
});
