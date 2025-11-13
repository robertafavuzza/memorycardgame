# Memory Card Game - ADHD Focus Edition

A therapeutic memory card game designed specifically for ADHD support, featuring binaural beats and calming audio frequencies to enhance concentration and focus.

## Features

### Therapeutic Audio
- **Binaural Beats Technology**: Each theme includes scientifically-backed binaural beats designed to help with ADHD
  - **Alpha Waves (8-12 Hz)**: Promotes calm alertness and reduces stress
  - **Beta Waves (14 Hz)**: Enhances focused attention and active concentration
- **Non-Intrusive Sounds**: Low-volume, balanced frequencies that support focus without distraction
- **Instant Mute Control**: Toggle background audio on/off immediately

### Multiple Themes
Choose from 5 unique visual themes, each with its own therapeutic frequency profile:
- **Vaporwave** (200 Hz + Alpha 10 Hz): Stress reduction and calm promotion
- **Fantasy** (220 Hz + Alpha 8 Hz): Creativity and imagination stimulation
- **Horror** (180 Hz + Alpha 10 Hz): Deep relaxation and concentration
- **Old Style** (240 Hz + Alpha 12 Hz): Natural harmony and mental focus
- **Retro** (260 Hz + Beta 14 Hz): Positive energy and active attention

### Progressive Difficulty
- **20 Levels**: Gradually increasing challenge from 8 pairs to 20 pairs
- **Smart Move Limits**: Balanced difficulty that adapts to each level
- **Real-Time Stats**: Track your matches, moves, and success rate
- **Animated Backgrounds**: Beautiful, theme-specific visual effects

### Game Features
- Smooth card flip animations
- Match/no-match audio feedback
- Win celebration effects
- Level progression system
- Responsive design for all devices

## Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Web Audio API** - Binaural beats generation
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/memory-card-game.git
cd memory-card-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## How to Play

1. **Choose a Theme**: Select your preferred visual theme from the top menu
2. **Start Playing**: Click any card to flip it over and reveal the image
3. **Find Matches**: Click another card to try to find its matching pair
4. **Progress Through Levels**: Match all pairs to advance to the next level
5. **Use Audio Support**: Keep binaural beats enabled for optimal focus (use headphones for best results)

## ADHD Support Features

This game is specifically designed to help individuals with ADHD by:

- **Binaural Beats**: Using stereo audio to create therapeutic brain entrainment
- **Visual Variety**: Multiple themes to maintain engagement
- **Progressive Challenge**: Prevents boredom while building confidence
- **Immediate Feedback**: Clear audio and visual cues for actions
- **Focus Training**: Exercises working memory and sustained attention

### Best Practices for ADHD Benefits
- Use **headphones or earbuds** for maximum binaural beat effectiveness
- Start with **lower levels** to build confidence
- Take **short breaks** between levels if needed
- Experiment with different **themes** to find what works best
- Keep audio at a **comfortable, low volume**

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx  # Theme-specific background effects
│   ├── GameBoard.tsx           # Main game logic and state
│   ├── GameStats.tsx           # Statistics display
│   ├── MemoryCard.tsx          # Individual card component
│   └── ThemeSwitcher.tsx       # Theme selection UI
├── services/
│   └── gameApi.ts              # Game data and images
├── types/
│   ├── game.ts                 # Game type definitions
│   └── theme.ts                # Theme type definitions
├── utils/
│   ├── audioManager.ts         # Binaural beats and audio system
│   └── gameLogic.ts            # Game mechanics and logic
├── App.tsx                     # Root component
└── main.tsx                    # Application entry point
```

## Audio Science

The binaural beats in this game are based on research showing that:

- **Alpha waves (8-12 Hz)** promote relaxed alertness and reduce anxiety
- **Beta waves (12-30 Hz)** enhance cognitive processing and focused attention
- **Binaural beats** work by playing slightly different frequencies in each ear, causing the brain to perceive a third "beat" at the difference frequency

This phenomenon, known as **brain entrainment**, can help guide brain activity into desired states that support concentration and reduce ADHD symptoms.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or educational purposes.

## Acknowledgments

- Binaural beats research from neuroscience and psychology communities
- Images provided by [Pexels](https://www.pexels.com)
- Icons by [Lucide](https://lucide.dev)

## Support

If you find this game helpful, please consider:
- Starring the repository
- Sharing it with others who might benefit
- Providing feedback or suggestions for improvement

---

**Note**: While this game incorporates therapeutic audio techniques, it is not a replacement for professional ADHD treatment. Always consult with healthcare providers for medical advice.
