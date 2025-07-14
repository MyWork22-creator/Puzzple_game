class LevelManager {
  constructor() {
    this.levels = this.initializeLevels();
  }

  initializeLevels() {
    return {
      1: {
        name: "First Steps",
        description: "Learn the basics. EchoBot moves randomly.",
        difficulty: "Easy",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
          [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 8, y: 8 },
        optimalMoves: 14
      },
      
      2: {
        name: "Echo Begins",
        description: "EchoBot starts learning from your Level 1 moves.",
        difficulty: "Easy",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 1, 0, 0, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 7, y: 7 },
        optimalMoves: 16
      },

      3: {
        name: "Pattern Recognition",
        description: "EchoBot mimics your previous strategies.",
        difficulty: "Medium",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 9, y: 9 },
        optimalMoves: 18
      },

      4: {
        name: "Advanced Mimicry",
        description: "EchoBot adapts and predicts your moves.",
        difficulty: "Medium",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 5, y: 5 },
        optimalMoves: 20
      },

      5: {
        name: "Master Challenge",
        description: "EchoBot has learned all your patterns. Can you outsmart it?",
        difficulty: "Hard",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 6, y: 6 },
        optimalMoves: 24
      },

      6: {
        name: "Maze Master",
        description: "Complex maze with EchoBot at full intelligence.",
        difficulty: "Hard",
        grid: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
          [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        playerStart: { x: 1, y: 1 },
        echoBotStart: { x: 7, y: 7 },
        optimalMoves: 26
      }
    };
  }

  getLevel(levelNumber) {
    return this.levels[levelNumber] || null;
  }

  getTotalLevels() {
    return Object.keys(this.levels).length;
  }

  getLevelInfo(levelNumber) {
    const level = this.getLevel(levelNumber);
    if (!level) return null;

    return {
      number: levelNumber,
      name: level.name,
      description: level.description,
      difficulty: level.difficulty,
      optimalMoves: level.optimalMoves,
      gridSize: {
        width: level.grid[0].length,
        height: level.grid.length
      }
    };
  }

  getAllLevelsInfo() {
    return Object.keys(this.levels).map(levelNum => 
      this.getLevelInfo(parseInt(levelNum))
    );
  }

  isValidLevel(levelNumber) {
    return this.levels.hasOwnProperty(levelNumber);
  }

  getNextLevel(currentLevel) {
    const nextLevel = currentLevel + 1;
    return this.isValidLevel(nextLevel) ? nextLevel : null;
  }

  getPreviousLevel(currentLevel) {
    const prevLevel = currentLevel - 1;
    return this.isValidLevel(prevLevel) && prevLevel > 0 ? prevLevel : null;
  }

  // Validate level data integrity
  validateLevel(levelNumber) {
    const level = this.getLevel(levelNumber);
    if (!level) return { valid: false, errors: ['Level not found'] };

    const errors = [];

    // Check if grid exists and is valid
    if (!level.grid || !Array.isArray(level.grid) || level.grid.length === 0) {
      errors.push('Invalid grid structure');
    } else {
      // Check if all rows have the same length
      const firstRowLength = level.grid[0].length;
      for (let i = 1; i < level.grid.length; i++) {
        if (level.grid[i].length !== firstRowLength) {
          errors.push(`Row ${i} has different length than first row`);
        }
      }

      // Check if there's at least one goal (3)
      let hasGoal = false;
      for (let row of level.grid) {
        if (row.includes(3)) {
          hasGoal = true;
          break;
        }
      }
      if (!hasGoal) {
        errors.push('No goal found in level');
      }
    }

    // Check player start position
    if (!level.playerStart || typeof level.playerStart.x !== 'number' || typeof level.playerStart.y !== 'number') {
      errors.push('Invalid player start position');
    } else {
      const { x, y } = level.playerStart;
      if (y < 0 || y >= level.grid.length || x < 0 || x >= level.grid[0].length) {
        errors.push('Player start position out of bounds');
      } else if (level.grid[y][x] === 1) {
        errors.push('Player start position is on a wall');
      }
    }

    // Check EchoBot start position
    if (!level.echoBotStart || typeof level.echoBotStart.x !== 'number' || typeof level.echoBotStart.y !== 'number') {
      errors.push('Invalid EchoBot start position');
    } else {
      const { x, y } = level.echoBotStart;
      if (y < 0 || y >= level.grid.length || x < 0 || x >= level.grid[0].length) {
        errors.push('EchoBot start position out of bounds');
      } else if (level.grid[y][x] === 1) {
        errors.push('EchoBot start position is on a wall');
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  // Get level statistics
  getLevelStats(levelNumber) {
    const level = this.getLevel(levelNumber);
    if (!level) return null;

    let walls = 0;
    let empty = 0;
    let goals = 0;
    let special = 0;

    for (let row of level.grid) {
      for (let cell of row) {
        switch (cell) {
          case 0: empty++; break;
          case 1: walls++; break;
          case 3: goals++; break;
          default: special++; break;
        }
      }
    }

    const totalCells = level.grid.length * level.grid[0].length;

    return {
      totalCells,
      walls,
      empty,
      goals,
      special,
      wallPercentage: Math.round((walls / totalCells) * 100),
      emptyPercentage: Math.round((empty / totalCells) * 100)
    };
  }
}

export default LevelManager;
