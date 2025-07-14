import React from 'react';
import './GameBoard.css';

const GameBoard = ({ gameState, onPlayerMove }) => {
  const { gameGrid, playerPosition, echoBotPosition, isGameStarted } = gameState;

  const getCellContent = (row, col) => {
    const isPlayer = playerPosition.x === col && playerPosition.y === row;
    const isEchoBot = echoBotPosition.x === col && echoBotPosition.y === row;
    const cellType = gameGrid[row] ? gameGrid[row][col] : 0;

    if (isPlayer && isEchoBot) {
      return '🤝'; // Player and bot on same cell
    }
    if (isPlayer) {
      return '👤'; // Player
    }
    if (isEchoBot) {
      return '🤖'; // EchoBot
    }

    switch (cellType) {
      case 0:
        return ''; // Empty space
      case 1:
        return '🧱'; // Wall
      case 2:
        return '📦'; // Movable box (future feature)
      case 3:
        return '🎯'; // Goal
      case 4:
        return '🔑'; // Key (future feature)
      case 5:
        return '🚪'; // Door (future feature)
      default:
        return '';
    }
  };

  const getCellClass = (row, col) => {
    const isPlayer = playerPosition.x === col && playerPosition.y === row;
    const isEchoBot = echoBotPosition.x === col && echoBotPosition.y === row;
    const cellType = gameGrid[row] ? gameGrid[row][col] : 0;

    let classes = ['game-cell'];

    if (cellType === 1) classes.push('wall');
    if (cellType === 3) classes.push('goal');
    if (isPlayer) classes.push('player');
    if (isEchoBot) classes.push('echobot');
    if (isPlayer && isEchoBot) classes.push('overlap');

    return classes.join(' ');
  };

  const handleCellClick = (row, col) => {
    if (!isGameStarted) return;

    const dx = col - playerPosition.x;
    const dy = row - playerPosition.y;

    // Only allow movement to adjacent cells
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      if (dx === 1) onPlayerMove('right');
      else if (dx === -1) onPlayerMove('left');
      else if (dy === 1) onPlayerMove('down');
      else if (dy === -1) onPlayerMove('up');
    }
  };

  if (!gameGrid || gameGrid.length === 0) {
    return <div className="game-board loading">Loading game...</div>;
  }

  return (
    <div className="game-board-container">
      <div className="game-board">
        {gameGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="game-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClass(rowIndex, colIndex)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                title={`Row: ${rowIndex}, Col: ${colIndex}`}
              >
                <span className="cell-content">
                  {getCellContent(rowIndex, colIndex)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {gameState.isGameWon && (
        <div className="win-overlay">
          <div className="win-message">
            <h2>🎉 Level Complete!</h2>
            <p>Moves: {gameState.moveCount}</p>
            <p>EchoBot learned from your strategy!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
