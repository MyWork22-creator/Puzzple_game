class EchoBot {
  constructor() {
    this.learnedPatterns = new Map(); // Level -> movement patterns
    this.currentReplayIndex = 0;
    this.currentReplayLevel = null;
    this.movementFrequency = new Map(); // Direction -> frequency
    this.lastPlayerMoves = [];
    this.adaptationLevel = 0; // How well the bot has learned
  }

  // Learn from a completed level
  learnFromLevel(levelNumber, playerHistory) {
    if (!playerHistory || playerHistory.length === 0) return;

    // Store the complete movement pattern for this level
    this.learnedPatterns.set(levelNumber, [...playerHistory]);

    // Analyze movement frequency
    playerHistory.forEach((move) => {
      const direction = move.direction;
      const current = this.movementFrequency.get(direction) || 0;
      this.movementFrequency.set(direction, current + 1);
    });

    // Increase adaptation level
    this.adaptationLevel = Math.min(this.adaptationLevel + 0.3, 1.0);

    console.log(`EchoBot learned from level ${levelNumber}:`, {
      moves: playerHistory.length,
      adaptationLevel: this.adaptationLevel,
      patterns: this.learnedPatterns.size,
    });
  }

  // Get the next move for EchoBot based on current game state and player move
  getNextMove(gameState, playerMove) {
    const { currentLevel, echoBotPosition, gameGrid } = gameState;

    // Level 1: Random movement (helper mode)
    if (currentLevel === 1) {
      return this.getRandomMove(echoBotPosition, gameGrid);
    }

    // Level 2+: Start using learned patterns
    if (currentLevel === 2) {
      return this.getLevel2Move(echoBotPosition, gameGrid, playerMove);
    }

    // Level 3+: Advanced mimicking
    return this.getAdvancedMove(
      echoBotPosition,
      gameGrid,
      playerMove,
      currentLevel
    );
  }

  // Level 1: Random movement with some intelligence
  getRandomMove(position, gameGrid) {
    const directions = ["up", "down", "left", "right"];
    const validMoves = [];

    directions.forEach((direction) => {
      const newPos = this.calculateNewPosition(position, direction);
      if (this.isValidMove(newPos, gameGrid)) {
        validMoves.push({ direction, position: newPos });
      }
    });

    if (validMoves.length === 0) return null;

    // 70% random, 30% towards center (helpful behavior)
    if (Math.random() < 0.7) {
      const randomIndex = Math.floor(Math.random() * validMoves.length);
      return {
        ...validMoves[randomIndex],
        timestamp: Date.now(),
        strategy: "random",
      };
    } else {
      // Move towards center of the grid
      const centerX = Math.floor(gameGrid[0].length / 2);
      const centerY = Math.floor(gameGrid.length / 2);
      const bestMove = validMoves.reduce((best, move) => {
        const distToCenterMove =
          Math.abs(move.position.x - centerX) +
          Math.abs(move.position.y - centerY);
        const distToCenterBest =
          Math.abs(best.position.x - centerX) +
          Math.abs(best.position.y - centerY);

        return distToCenterMove < distToCenterBest ? move : best;
      });

      return {
        ...bestMove,
        timestamp: Date.now(),
        strategy: "helpful",
      };
    }
  }

  // Level 2: Start retracing level 1 patterns
  getLevel2Move(position, gameGrid, playerMove) {
    const level1Pattern = this.learnedPatterns.get(1);

    if (!level1Pattern || level1Pattern.length === 0) {
      return this.getRandomMove(position, gameGrid);
    }

    // Try to follow the learned pattern from level 1
    if (this.currentReplayLevel !== 2) {
      this.currentReplayLevel = 2;
      this.currentReplayIndex = 0;
    }

    // Get the next move from the pattern
    if (this.currentReplayIndex < level1Pattern.length) {
      const patternMove = level1Pattern[this.currentReplayIndex];
      const newPos = this.calculateNewPosition(position, patternMove.direction);

      if (this.isValidMove(newPos, gameGrid)) {
        this.currentReplayIndex++;
        return {
          direction: patternMove.direction,
          position: newPos,
          timestamp: Date.now(),
          strategy: "replay_level1",
        };
      }
    }

    // If pattern is exhausted or move is invalid, use frequency-based movement
    return this.getFrequencyBasedMove(position, gameGrid);
  }

  // Level 3+: Advanced mimicking with adaptation
  getAdvancedMove(position, gameGrid, playerMove, currentLevel) {
    // Store recent player moves for pattern recognition
    this.lastPlayerMoves.push(playerMove);
    if (this.lastPlayerMoves.length > 10) {
      this.lastPlayerMoves.shift();
    }

    // 40% chance to mimic recent player behavior
    if (Math.random() < 0.4 && this.lastPlayerMoves.length > 0) {
      const recentMove =
        this.lastPlayerMoves[
          Math.floor(Math.random() * this.lastPlayerMoves.length)
        ];
      const newPos = this.calculateNewPosition(position, recentMove.direction);

      if (this.isValidMove(newPos, gameGrid)) {
        return {
          direction: recentMove.direction,
          position: newPos,
          timestamp: Date.now(),
          strategy: "mimic_recent",
        };
      }
    }

    // 30% chance to use learned patterns from previous levels
    if (Math.random() < 0.3) {
      const availableLevels = Array.from(this.learnedPatterns.keys());
      if (availableLevels.length > 0) {
        const randomLevel =
          availableLevels[Math.floor(Math.random() * availableLevels.length)];
        const pattern = this.learnedPatterns.get(randomLevel);

        if (pattern && pattern.length > 0) {
          const randomMove =
            pattern[Math.floor(Math.random() * pattern.length)];
          const newPos = this.calculateNewPosition(
            position,
            randomMove.direction
          );

          if (this.isValidMove(newPos, gameGrid)) {
            return {
              direction: randomMove.direction,
              position: newPos,
              timestamp: Date.now(),
              strategy: `replay_level${randomLevel}`,
            };
          }
        }
      }
    }

    // 30% chance for frequency-based intelligent movement
    return this.getFrequencyBasedMove(position, gameGrid);
  }

  // Move based on learned movement frequency
  getFrequencyBasedMove(position, gameGrid) {
    const directions = ["up", "down", "left", "right"];
    const weightedMoves = [];

    directions.forEach((direction) => {
      const newPos = this.calculateNewPosition(position, direction);
      if (this.isValidMove(newPos, gameGrid)) {
        const frequency = this.movementFrequency.get(direction) || 1;
        // Add multiple entries based on frequency to weight the random selection
        for (let i = 0; i < frequency; i++) {
          weightedMoves.push({ direction, position: newPos });
        }
      }
    });

    if (weightedMoves.length === 0) {
      return this.getRandomMove(position, gameGrid);
    }

    const selectedMove =
      weightedMoves[Math.floor(Math.random() * weightedMoves.length)];
    return {
      ...selectedMove,
      timestamp: Date.now(),
      strategy: "frequency_based",
    };
  }

  // Helper method to calculate new position based on direction
  calculateNewPosition(position, direction) {
    const { x, y } = position;
    switch (direction) {
      case "up":
        return { x, y: y - 1 };
      case "down":
        return { x, y: y + 1 };
      case "left":
        return { x: x - 1, y };
      case "right":
        return { x: x + 1, y };
      default:
        return position;
    }
  }

  // Helper method to check if a move is valid
  isValidMove(position, gameGrid) {
    const { x, y } = position;

    // Check bounds
    if (y < 0 || y >= gameGrid.length || x < 0 || x >= gameGrid[0].length) {
      return false;
    }

    // Check for walls (1 = wall)
    return gameGrid[y][x] !== 1;
  }

  // Get current learning statistics
  getLearningStats() {
    return {
      adaptationLevel: this.adaptationLevel,
      learnedLevels: this.learnedPatterns.size,
      movementFrequency: Object.fromEntries(this.movementFrequency),
      totalLearnedMoves: Array.from(this.learnedPatterns.values()).reduce(
        (total, pattern) => total + pattern.length,
        0
      ),
    };
  }

  // Reset learning data (for new game)
  reset() {
    this.learnedPatterns.clear();
    this.currentReplayIndex = 0;
    this.currentReplayLevel = null;
    this.movementFrequency.clear();
    this.lastPlayerMoves = [];
    this.adaptationLevel = 0;
  }
}

export default EchoBot;
