import React from 'react';
import './GameUI.css';

const GameUI = ({ gameState, onStart, onReset, onNextLevel }) => {
  const { 
    currentLevel, 
    moveCount, 
    isGameStarted, 
    isGameWon, 
    playerHistory, 
    echoBotHistory 
  } = gameState;

  const getEchoBotStatus = () => {
    if (currentLevel === 1) {
      return "🎲 Random Movement";
    } else if (currentLevel === 2) {
      return "📚 Learning from Level 1";
    } else {
      return "🧠 Mimicking Your Strategy";
    }
  };

  const getEfficiencyRating = () => {
    if (moveCount === 0) return "N/A";
    if (moveCount <= 10) return "⭐⭐⭐ Excellent";
    if (moveCount <= 20) return "⭐⭐ Good";
    if (moveCount <= 30) return "⭐ Fair";
    return "💭 Room for Improvement";
  };

  return (
    <div className="game-ui">
      <div className="game-stats">
        <div className="stat-group">
          <div className="stat-item">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{currentLevel}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moveCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Efficiency:</span>
            <span className="stat-value">{getEfficiencyRating()}</span>
          </div>
        </div>
        
        <div className="echobot-status">
          <h4>🤖 EchoBot Status</h4>
          <p>{getEchoBotStatus()}</p>
          <div className="history-stats">
            <span>Player Moves: {playerHistory.length}</span>
            <span>Bot Moves: {echoBotHistory.length}</span>
          </div>
        </div>
      </div>

      <div className="game-controls">
        {!isGameStarted ? (
          <button className="game-button start-button" onClick={onStart}>
            🚀 Start Game
          </button>
        ) : (
          <>
            <button className="game-button reset-button" onClick={onReset}>
              🔄 Reset Level
            </button>
            {isGameWon && (
              <button className="game-button next-button" onClick={onNextLevel}>
                ➡️ Next Level
              </button>
            )}
          </>
        )}
      </div>

      {isGameWon && (
        <div className="level-complete-info">
          <h3>🎯 Level {currentLevel} Complete!</h3>
          <div className="completion-stats">
            <p>✅ Completed in {moveCount} moves</p>
            <p>🤖 EchoBot made {echoBotHistory.length} moves</p>
            <p>📊 Efficiency: {getEfficiencyRating()}</p>
          </div>
          <div className="ai-learning-info">
            <h4>🧠 AI Learning Progress:</h4>
            <p>EchoBot has analyzed your movement patterns and will use this data in future levels!</p>
            {currentLevel >= 2 && (
              <p>🔄 In the next level, EchoBot will try to replicate your strategy from previous levels.</p>
            )}
          </div>
        </div>
      )}

      <div className="game-legend">
        <h4>🎮 Game Elements:</h4>
        <div className="legend-grid">
          <div className="legend-item">
            <span className="legend-icon">👤</span>
            <span className="legend-text">You</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🤖</span>
            <span className="legend-text">EchoBot</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🎯</span>
            <span className="legend-text">Goal</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🧱</span>
            <span className="legend-text">Wall</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🤝</span>
            <span className="legend-text">Both</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameUI;
