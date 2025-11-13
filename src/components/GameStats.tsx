import type { Theme } from '../types/theme';

interface GameStatsProps {
  moves: number;
  matches: number;
  gameWon: boolean;
  level: number;
  pairsNeeded: number;
  maxMoves: number;
  theme: Theme;
}

export default function GameStats({ moves, matches, level, pairsNeeded, maxMoves, theme }: GameStatsProps) {
  const movesRemaining = maxMoves - moves;
  const isLowMoves = movesRemaining <= 3;

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 px-2">
      <div className={`bg-gradient-to-br ${theme.statBox1} px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl border-2 sm:border-3 md:border-4 ${theme.statBorder} ${theme.shadow}`}>
        <div className="text-center">
          <p className={`text-xs sm:text-sm ${theme.textPrimary} font-bold mb-0.5 sm:mb-1 tracking-wider sm:tracking-widest`}>LEVEL</p>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-black ${theme.textPrimary} retro-text`}>{level}</p>
        </div>
      </div>

      <div className={`bg-gradient-to-br px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl border-2 sm:border-3 md:border-4 ${theme.shadow} transition-all duration-300 ${
        isLowMoves
          ? 'from-red-500 to-red-700 border-red-300 animate-pulse'
          : `${theme.statBox2} ${theme.statBorder}`
      }`}>
        <div className="text-center">
          <p className={`text-xs sm:text-sm ${theme.textPrimary} font-bold mb-0.5 sm:mb-1 tracking-wider sm:tracking-widest whitespace-nowrap`}>MOVES LEFT</p>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-black ${theme.textPrimary} retro-text`}>{movesRemaining}</p>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${theme.statBox3} px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl border-2 sm:border-3 md:border-4 ${theme.statBorder} ${theme.shadow}`}>
        <div className="text-center">
          <p className={`text-xs sm:text-sm ${theme.textPrimary} font-bold mb-0.5 sm:mb-1 tracking-wider sm:tracking-widest`}>MATCHES</p>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-black ${theme.textPrimary} retro-text`}>{matches} / {pairsNeeded}</p>
        </div>
      </div>
    </div>
  );
}
