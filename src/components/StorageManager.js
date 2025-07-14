class StorageManager {
  constructor() {
    this.storageKeys = {
      gameState: 'puzzleGame_gameState',
      playerProgress: 'puzzleGame_playerProgress',
      echoBotData: 'puzzleGame_echoBotData',
      settings: 'puzzleGame_settings',
      statistics: 'puzzleGame_statistics'
    };
    
    // Initialize storage if not exists
    this.initializeStorage();
  }

  // Initialize default storage values
  initializeStorage() {
    if (!this.getPlayerProgress()) {
      this.savePlayerProgress({
        highestLevel: 1,
        levelsCompleted: [],
        totalMoves: 0,
        totalPlayTime: 0,
        bestTimes: {},
        bestMoveCount: {}
      });
    }

    if (!this.getSettings()) {
      this.saveSettings({
        soundEnabled: true,
        animationsEnabled: true,
        showHints: true,
        difficulty: 'normal'
      });
    }

    if (!this.getStatistics()) {
      this.saveStatistics({
        gamesPlayed: 0,
        totalMoves: 0,
        averageMovesPerLevel: {},
        timeSpentPlaying: 0,
        echoBotInteractions: 0,
        levelsRestarted: 0
      });
    }
  }

  // Game State Management
  saveGameState(gameState) {
    try {
      const stateToSave = {
        currentLevel: gameState.currentLevel,
        playerPosition: gameState.playerPosition,
        echoBotPosition: gameState.echoBotPosition,
        moveCount: gameState.moveCount,
        isGameStarted: gameState.isGameStarted,
        playerHistory: gameState.playerHistory,
        echoBotHistory: gameState.echoBotHistory,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.storageKeys.gameState, JSON.stringify(stateToSave));
      return true;
    } catch (error) {
      console.error('Failed to save game state:', error);
      return false;
    }
  }

  loadGameState() {
    try {
      const saved = localStorage.getItem(this.storageKeys.gameState);
      if (saved) {
        const gameState = JSON.parse(saved);
        
        // Check if saved state is not too old (24 hours)
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - gameState.timestamp < maxAge) {
          return gameState;
        } else {
          // Clear old save
          this.clearGameState();
        }
      }
      return null;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  }

  clearGameState() {
    try {
      localStorage.removeItem(this.storageKeys.gameState);
      return true;
    } catch (error) {
      console.error('Failed to clear game state:', error);
      return false;
    }
  }

  // Player Progress Management
  savePlayerProgress(progress) {
    try {
      localStorage.setItem(this.storageKeys.playerProgress, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Failed to save player progress:', error);
      return false;
    }
  }

  getPlayerProgress() {
    try {
      const saved = localStorage.getItem(this.storageKeys.playerProgress);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load player progress:', error);
      return null;
    }
  }

  updatePlayerProgress(levelNumber, moveCount, timeSpent) {
    const progress = this.getPlayerProgress() || {};
    
    // Update highest level reached
    progress.highestLevel = Math.max(progress.highestLevel || 1, levelNumber);
    
    // Add to completed levels if not already there
    if (!progress.levelsCompleted) progress.levelsCompleted = [];
    if (!progress.levelsCompleted.includes(levelNumber)) {
      progress.levelsCompleted.push(levelNumber);
    }
    
    // Update best move count for this level
    if (!progress.bestMoveCount) progress.bestMoveCount = {};
    if (!progress.bestMoveCount[levelNumber] || moveCount < progress.bestMoveCount[levelNumber]) {
      progress.bestMoveCount[levelNumber] = moveCount;
    }
    
    // Update best time for this level
    if (!progress.bestTimes) progress.bestTimes = {};
    if (!progress.bestTimes[levelNumber] || timeSpent < progress.bestTimes[levelNumber]) {
      progress.bestTimes[levelNumber] = timeSpent;
    }
    
    // Update totals
    progress.totalMoves = (progress.totalMoves || 0) + moveCount;
    progress.totalPlayTime = (progress.totalPlayTime || 0) + timeSpent;
    
    return this.savePlayerProgress(progress);
  }

  // EchoBot Data Management
  saveEchoBotData(echoBotData) {
    try {
      const dataToSave = {
        learnedPatterns: Array.from(echoBotData.learnedPatterns.entries()),
        movementFrequency: Array.from(echoBotData.movementFrequency.entries()),
        adaptationLevel: echoBotData.adaptationLevel,
        timestamp: Date.now()
      };
      
      localStorage.setItem(this.storageKeys.echoBotData, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Failed to save EchoBot data:', error);
      return false;
    }
  }

  loadEchoBotData() {
    try {
      const saved = localStorage.getItem(this.storageKeys.echoBotData);
      if (saved) {
        const data = JSON.parse(saved);
        
        // Convert arrays back to Maps
        return {
          learnedPatterns: new Map(data.learnedPatterns),
          movementFrequency: new Map(data.movementFrequency),
          adaptationLevel: data.adaptationLevel,
          timestamp: data.timestamp
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to load EchoBot data:', error);
      return null;
    }
  }

  // Settings Management
  saveSettings(settings) {
    try {
      localStorage.setItem(this.storageKeys.settings, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  getSettings() {
    try {
      const saved = localStorage.getItem(this.storageKeys.settings);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  updateSetting(key, value) {
    const settings = this.getSettings() || {};
    settings[key] = value;
    return this.saveSettings(settings);
  }

  // Statistics Management
  saveStatistics(stats) {
    try {
      localStorage.setItem(this.storageKeys.statistics, JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error('Failed to save statistics:', error);
      return false;
    }
  }

  getStatistics() {
    try {
      const saved = localStorage.getItem(this.storageKeys.statistics);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load statistics:', error);
      return null;
    }
  }

  updateStatistics(updates) {
    const stats = this.getStatistics() || {};
    
    Object.keys(updates).forEach(key => {
      if (typeof updates[key] === 'number' && typeof stats[key] === 'number') {
        stats[key] = (stats[key] || 0) + updates[key];
      } else {
        stats[key] = updates[key];
      }
    });
    
    return this.saveStatistics(stats);
  }

  // Utility Methods
  exportData() {
    try {
      const data = {
        gameState: this.loadGameState(),
        playerProgress: this.getPlayerProgress(),
        echoBotData: this.loadEchoBotData(),
        settings: this.getSettings(),
        statistics: this.getStatistics(),
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Failed to export data:', error);
      return null;
    }
  }

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.playerProgress) this.savePlayerProgress(data.playerProgress);
      if (data.settings) this.saveSettings(data.settings);
      if (data.statistics) this.saveStatistics(data.statistics);
      if (data.echoBotData) this.saveEchoBotData(data.echoBotData);
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  clearAllData() {
    try {
      Object.values(this.storageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Reinitialize with defaults
      this.initializeStorage();
      return true;
    } catch (error) {
      console.error('Failed to clear all data:', error);
      return false;
    }
  }

  getStorageUsage() {
    try {
      let totalSize = 0;
      const usage = {};
      
      Object.entries(this.storageKeys).forEach(([name, key]) => {
        const data = localStorage.getItem(key);
        const size = data ? new Blob([data]).size : 0;
        usage[name] = size;
        totalSize += size;
      });
      
      return {
        total: totalSize,
        breakdown: usage,
        totalFormatted: this.formatBytes(totalSize)
      };
    } catch (error) {
      console.error('Failed to calculate storage usage:', error);
      return null;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Check if localStorage is available
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}


export default StorageManager;
