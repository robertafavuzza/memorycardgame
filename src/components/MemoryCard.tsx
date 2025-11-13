import type { Card } from '../types/game';
import type { Theme } from '../types/theme';

interface MemoryCardProps {
  card: Card;
  onClick: (card: Card) => void;
  disabled: boolean;
  theme: Theme;
}

export default function MemoryCard({ card, onClick, disabled, theme }: MemoryCardProps) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full aspect-square cursor-pointer
        ${disabled && !card.isFlipped && !card.isMatched ? 'cursor-not-allowed opacity-70' : ''}
        ${card.isMatched ? 'opacity-50 scale-95' : 'hover:scale-105'}
      `}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        <div
          className={`absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 ${theme.cardBorder} ${theme.shadow} overflow-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${theme.cardBack} flex items-center justify-center`}>
            <div className={`text-3xl sm:text-4xl md:text-6xl font-black ${theme.textPrimary} opacity-20 retro-text`}>?</div>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-3 md:border-4 ${theme.cardFlippedBorder} ${theme.shadow} overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-cyan-400/30" />
        </div>
      </div>
    </div>
  );
}
