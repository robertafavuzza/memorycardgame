import { useState, useEffect } from 'react';
import type { Card, GameState } from '../types/game';
import { fetchPopularGames } from '../services/gameApi';
import { createCardPairs, checkMatch, getPairsForLevel, getMaxMovesForLevel } from '../utils/gameLogic';
import { audioManager } from '../utils/audioManager';
import MemoryCard from './MemoryCard';
import GameStats from './GameStats';
import ThemeSwitcher from './ThemeSwitcher';
import AnimatedBackground from './AnimatedBackground';
import { RefreshCw, Volume2, VolumeX } from 'lucide-react';
import type { ThemeType } from '../types/theme';
import { themes } from '../types/theme';

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    matches: 0,
    isChecking: false,
    gameWon: false,
    level: 1,
    pairsNeeded: 8,
    maxMoves: 18,
    gameLost: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('vaporwave');

  const theme = themes[currentTheme];

  const initializeGame = async (level: number = 1) => {
    setIsLoading(true);
    const pairsNeeded = getPairsForLevel(level);
    const maxMoves = getMaxMovesForLevel(level, pairsNeeded);
    const games = await fetchPopularGames(pairsNeeded, currentTheme);
    const cards = createCardPairs(games);
    setGameState({
      cards,
      flippedCards: [],
      moves: 0,
      matches: 0,
      isChecking: false,
      gameWon: false,
      level,
      pairsNeeded,
      maxMoves,
      gameLost: false
    });
    setIsLoading(false);
  };

  useEffect(() => {
    initializeGame();
    audioManager.setTheme(currentTheme);
    audioManager.playBackgroundMusic();
  }, []);

  useEffect(() => {
    audioManager.setTheme(currentTheme);
    initializeGame(1);
  }, [currentTheme]);

  const handleCardClick = (clickedCard: Card) => {
    if (gameState.isChecking || gameState.flippedCards.length >= 2 || gameState.gameLost) return;

    audioManager.playCardFlip();

    const updatedCards = gameState.cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    const newFlippedCards = [...gameState.flippedCards, clickedCard];

    setGameState(prev => ({
      ...prev,
      cards: updatedCards,
      flippedCards: newFlippedCards
    }));

    if (newFlippedCards.length === 2) {
      setGameState(prev => ({ ...prev, isChecking: true }));

      setTimeout(() => {
        checkCards(newFlippedCards[0], newFlippedCards[1]);
      }, 1000);
    }
  };

  const checkCards = (card1: Card, card2: Card) => {
    const isMatch = checkMatch(card1, card2);

    if (isMatch) {
      audioManager.playMatch();
    } else {
      audioManager.playNoMatch();
    }

    setGameState(prev => {
      const updatedCards = prev.cards.map(card => {
        if (isMatch && (card.id === card1.id || card.id === card2.id)) {
          return { ...card, isMatched: true };
        }
        if (!isMatch && (card.id === card1.id || card.id === card2.id)) {
          return { ...card, isFlipped: false };
        }
        return card;
      });

      const newMoves = isMatch ? prev.moves : prev.moves + 1;
      const newMatches = isMatch ? prev.matches + 1 : prev.matches;
      const gameWon = newMatches === prev.pairsNeeded;
      const gameLost = newMoves >= prev.maxMoves && !gameWon;

      if (gameWon) {
        setTimeout(() => audioManager.playWin(), 300);
      }

      if (gameLost) {
        setTimeout(() => audioManager.playNoMatch(), 300);
      }

      return {
        ...prev,
        cards: updatedCards,
        flippedCards: [],
        moves: newMoves,
        matches: newMatches,
        isChecking: false,
        gameWon,
        gameLost
      };
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.background}`}>
        <div className={`text-6xl font-black ${theme.textPrimary} retro-text animate-pulse`}>
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4 sm:p-6 md:p-8 relative overflow-hidden`}>
      <AnimatedBackground theme={currentTheme} />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <button
        onClick={() => {
          const muted = audioManager.toggleMusicMute();
          setIsMuted(muted);
        }}
        className={`
          fixed top-4 left-4 sm:top-8 sm:left-8 z-50
          w-12 h-12 sm:w-16 sm:h-16
          bg-gradient-to-br ${theme.buttonGradient}
          text-white rounded-full
          border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
          hover:scale-110 hover:rotate-12
          transition-all duration-300
          flex items-center justify-center
        `}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 sm:w-7 sm:h-7" /> : <Volume2 className="w-5 h-5 sm:w-7 sm:h-7" />}
      </button>

      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={theme} />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black ${theme.textPrimary} mb-2 sm:mb-4 retro-text ${theme.textGlow}`}>
            MEMORY GAME
          </h1>
          <p className={`text-sm sm:text-xl md:text-2xl ${theme.textSecondary} font-bold tracking-widest`}>
            {theme.displayName} EDITION
          </p>
        </header>

        <GameStats
          moves={gameState.moves}
          matches={gameState.matches}
          gameWon={gameState.gameWon}
          level={gameState.level}
          pairsNeeded={gameState.pairsNeeded}
          maxMoves={gameState.maxMoves}
          theme={theme}
        />

        <div className={`grid gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 ${
          gameState.pairsNeeded <= 12
            ? 'grid-cols-4'
            : gameState.pairsNeeded <= 16
            ? 'grid-cols-4 sm:grid-cols-5'
            : 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6'
        }`}>
          {gameState.cards.map(card => (
            <MemoryCard
              key={card.id}
              card={card}
              onClick={handleCardClick}
              disabled={gameState.isChecking}
              theme={theme}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => initializeGame(1)}
            className={`
              px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.buttonGradient}
              text-white font-black text-base sm:text-lg md:text-xl rounded-lg
              border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
              hover:scale-110 hover:rotate-2
              transition-all duration-300
              flex items-center gap-2 sm:gap-3 mx-auto
            `}
          >
            <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
            NEW GAME
          </button>
        </div>

        <footer className="mt-8 sm:mt-12 text-center">
          <p className={`${theme.textSecondary} text-sm sm:text-base font-bold`}>
            Made by{' '}
            <a
              href="https://github.com/robertafavuzza"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.textPrimary} hover:opacity-80 transition-opacity duration-300 underline`}
            >
              @BobiDarling
            </a>
          </p>
        </footer>
      </div>

      {gameState.gameLost && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className={`bg-gradient-to-br ${theme.loseModalBg} p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border-4 sm:border-6 md:border-8 ${theme.cardBorder} ${theme.shadow} text-center max-w-lg w-full`}>
            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-black ${theme.textPrimary} mb-3 sm:mb-4 md:mb-6 retro-text ${theme.textGlow}`}>
              GAME OVER!
            </h2>
            <p className={`text-xl sm:text-2xl md:text-3xl ${theme.textSecondary} mb-2 sm:mb-3 md:mb-4`}>
              Out of moves!
            </p>
            <p className={`text-lg sm:text-xl md:text-2xl ${theme.textSecondary} mb-4 sm:mb-6 md:mb-8`}>
              Matched: {gameState.matches} / {gameState.pairsNeeded}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => initializeGame(gameState.level)}
                className={`
                  px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.buttonGradient}
                  text-white font-black text-lg sm:text-xl md:text-2xl rounded-lg
                  border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
                  hover:scale-110 hover:rotate-2
                  transition-all duration-300
                `}
              >
                TRY AGAIN
              </button>
              <button
                onClick={() => initializeGame(1)}
                className={`
                  px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.buttonGradient}
                  text-white font-black text-lg sm:text-xl md:text-2xl rounded-lg
                  border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
                  hover:scale-110 hover:rotate-2
                  transition-all duration-300
                `}
              >
                RESTART
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState.gameWon && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className={`bg-gradient-to-br ${theme.winModalBg} p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border-4 sm:border-6 md:border-8 ${theme.cardFlippedBorder} ${theme.shadow} text-center max-w-lg w-full`}>
            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-black ${theme.textPrimary} mb-3 sm:mb-4 md:mb-6 retro-text ${theme.textGlow}`}>
              YOU WIN!
            </h2>
            <p className={`text-xl sm:text-2xl md:text-3xl ${theme.textSecondary} mb-4 sm:mb-6 md:mb-8`}>
              Moves: {gameState.moves}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => initializeGame(gameState.level + 1)}
                className={`
                  px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.buttonGradient}
                  text-white font-black text-lg sm:text-xl md:text-2xl rounded-lg
                  border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
                  hover:scale-110 hover:rotate-2
                  transition-all duration-300
                `}
              >
                NEXT LEVEL
              </button>
              <button
                onClick={() => initializeGame(1)}
                className={`
                  px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.buttonGradient}
                  text-white font-black text-lg sm:text-xl md:text-2xl rounded-lg
                  border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
                  hover:scale-110 hover:rotate-2
                  transition-all duration-300
                `}
              >
                RESTART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
