import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./GameBoard";
import GameUI from "./GameUI";
import EchoBot from "./EchoBot";
import LevelManager from "./LevelManager";
import StorageManager from "./StorageManager";
import "./PuzzleGame.css";

const PuzzleGame = () => {
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    playerPosition: { x: 1, y: 1 },
    echoBotPosition: { x: 8, y: 8 },
    gameGrid: [],
    isGameWon: false,
    isGameStarted: false,
    moveCount: 0,
    playerHistory: [],
    echoBotHistory: [],
  });

  const [echoBot, setEchoBot] = useState(null);
  const [levelManager, setLevelManager] = useState(null);
  const [storageManager, setStorageManager] = useState(null);

  // Initialize game systems
  useEffect(() => {
    const storage = new StorageManager();
    const levels = new LevelManager();
    const bot = new EchoBot();

    setStorageManager(storage);
    setLevelManager(levels);
    setEchoBot(bot);

    // Load saved game state
    const savedState = storage.loadGameState();
    if (savedState) {
      setGameState((prev) => ({ ...prev, ...savedState }));
    }

    // Initialize first level
    const levelData = levels.getLevel(1);
    setGameState((prev) => ({
      ...prev,
      gameGrid: levelData.grid,
      playerPosition: levelData.playerStart,
      echoBotPosition: levelData.echoBotStart,
    }));
  }, []);

  // Save game state when it changes
  useEffect(() => {
    if (storageManager && gameState.isGameStarted) {
      storageManager.saveGameState(gameState);
    }
  }, [gameState, storageManager]);

  const movePlayer = useCallback(
    (direction) => {
      if (!gameState.isGameStarted || gameState.isGameWon) return;

      const { x, y } = gameState.playerPosition;
      let newX = x;
      let newY = y;

      switch (direction) {
        case "up":
          newY = Math.max(0, y - 1);
          break;
        case "down":
          newY = Math.min(gameState.gameGrid.length - 1, y + 1);
          break;
        case "left":
          newX = Math.max(0, x - 1);
          break;
        case "right":
          newX = Math.min(gameState.gameGrid[0].length - 1, x + 1);
          break;
        default:
          return;
      }

      // Check collision with walls
      if (gameState.gameGrid[newY][newX] === 1) return;

      const newPosition = { x: newX, y: newY };
      const move = { position: newPosition, direction, timestamp: Date.now() };

      setGameState((prev) => {
        const newHistory = [...prev.playerHistory, move];

        // Check win condition (reach goal)
        const isWon = gameState.gameGrid[newY][newX] === 3;

        return {
          ...prev,
          playerPosition: newPosition,
          moveCount: prev.moveCount + 1,
          playerHistory: newHistory,
          isGameWon: isWon,
        };
      });

      // Update EchoBot after player move
      if (echoBot) {
        setTimeout(() => {
          const botMove = echoBot.getNextMove(gameState, move);
          if (botMove) {
            setGameState((prev) => ({
              ...prev,
              echoBotPosition: botMove.position,
              echoBotHistory: [...prev.echoBotHistory, botMove],
            }));
          }
        }, 300); // Slight delay for visual effect
      }
    },
    [gameState, echoBot]
  );

  const startGame = () => {
    setGameState((prev) => ({ ...prev, isGameStarted: true }));
  };

  const resetLevel = useCallback(() => {
    if (!levelManager) return;

    const levelData = levelManager.getLevel(gameState.currentLevel);
    setGameState((prev) => ({
      ...prev,
      playerPosition: levelData.playerStart,
      echoBotPosition: levelData.echoBotStart,
      isGameWon: false,
      moveCount: 0,
      playerHistory: [],
      echoBotHistory: [],
    }));
  }, [levelManager, gameState.currentLevel]);

  const nextLevel = () => {
    if (!levelManager) return;

    const nextLevelNum = gameState.currentLevel + 1;
    const levelData = levelManager.getLevel(nextLevelNum);

    if (levelData) {
      // Train EchoBot with current level data
      if (echoBot) {
        echoBot.learnFromLevel(gameState.currentLevel, gameState.playerHistory);
      }

      setGameState((prev) => ({
        ...prev,
        currentLevel: nextLevelNum,
        gameGrid: levelData.grid,
        playerPosition: levelData.playerStart,
        echoBotPosition: levelData.echoBotStart,
        isGameWon: false,
        moveCount: 0,
        playerHistory: [],
        echoBotHistory: [],
      }));
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          event.preventDefault();
          movePlayer("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();
          movePlayer("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          event.preventDefault();
          movePlayer("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          event.preventDefault();
          movePlayer("right");
          break;
        case "r":
        case "R":
          resetLevel();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePlayer, resetLevel]);

  return (
    <div className="puzzle-game">
      <div className="game-header">
        <h1>🧩 EchoBot Puzzle</h1>
        <p>Navigate to the goal while the AI learns from your moves!</p>
      </div>

      <GameUI
        gameState={gameState}
        onStart={startGame}
        onReset={resetLevel}
        onNextLevel={nextLevel}
      />

      <GameBoard gameState={gameState} onPlayerMove={movePlayer} />

      <div className="game-instructions">
        <h3>Controls:</h3>
        <p>🎮 Arrow Keys or WASD to move</p>
        <p>🔄 R to reset level</p>
        <p>🎯 Reach the goal (🎯) to win!</p>
        <p>🤖 Watch EchoBot learn from your moves!</p>
      </div>
    </div>
  );
};

export default PuzzleGame;
