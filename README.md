# 🧩 EchoBot Puzzle Game

A 2D puzzle game where an AI learns from your movements and gradually mimics your behavior. Navigate through increasingly complex mazes while the EchoBot AI studies your patterns and adapts its strategy.

## 🎮 Game Features

### 🧠 Intelligent AI System

- **Level 1**: EchoBot moves randomly, acting as a helpful companion
- **Level 2**: EchoBot starts learning from your Level 1 movements
- **Level 3+**: EchoBot mimics your strategies and predicts your moves

### 🎯 Progressive Difficulty

- 6 handcrafted levels with increasing complexity
- Grid-based puzzle mechanics
- Simple goal: reach the target while avoiding walls

### 💾 Local Storage System

- Automatic save/load functionality
- Progress tracking across sessions
- Movement history storage for AI learning
- Performance statistics

### 🎨 Modern UI Design

- Minimalist pixel-style graphics
- Responsive design for all devices
- Smooth animations and visual feedback
- Accessibility features included

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the puzzle_game directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Game

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## 🎮 How to Play

### Controls

- **Arrow Keys** or **WASD**: Move your character
- **R**: Reset current level
- **Mouse**: Click adjacent cells to move

### Game Elements

- 👤 **You**: The player character
- 🤖 **EchoBot**: The AI that learns from you
- 🎯 **Goal**: Reach this to complete the level
- 🧱 **Wall**: Impassable obstacles
- 🤝 **Overlap**: When you and EchoBot are on the same cell

### Objective

Navigate through each level to reach the goal (🎯) while observing how EchoBot learns and adapts to your movement patterns.

## 🧠 AI Learning System

The EchoBot AI uses a sophisticated learning system:

1. **Pattern Recognition**: Stores and analyzes your movement sequences
2. **Frequency Analysis**: Learns which directions you prefer
3. **Adaptive Behavior**: Gradually transitions from random to strategic movement
4. **Memory Persistence**: Remembers patterns across game sessions

## 🏗️ Technical Architecture

### Core Components

- **PuzzleGame**: Main game controller and state management
- **GameBoard**: Renders the game grid and handles interactions
- **GameUI**: User interface and game statistics
- **EchoBot**: AI system with learning algorithms
- **LevelManager**: Level data and progression logic
- **StorageManager**: Local storage and data persistence

### Technologies Used

- React 19.1.0
- CSS3 with modern features
- Local Storage API
- Jest for testing
- Create React App for build system

## 🎨 Design Philosophy

### Minimalist Aesthetics

- Clean, pixel-inspired visual design
- Intuitive emoji-based game elements
- Smooth animations and transitions

### Accessibility First

- High contrast mode support
- Reduced motion preferences
- Keyboard navigation
- Screen reader friendly

### Performance Optimized

- Efficient state management
- Minimal re-renders
- Responsive design patterns

## 🧪 Testing

The game includes comprehensive tests covering:

- Component rendering
- User interactions
- Game logic
- AI behavior
- Storage functionality

Run tests with: `npm test`

## 🔮 Future Enhancements

Potential features for future versions:

- Sound effects and background music
- More complex puzzle mechanics (keys, doors, movable boxes)
- Multiplayer mode
- Level editor
- Advanced AI personalities
- Achievement system

## 📱 Browser Compatibility

Tested and optimized for:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a demonstration project showcasing AI learning in games. Feel free to explore the code and adapt it for your own projects!

## 📄 License

This project is open source and available under the MIT License.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
