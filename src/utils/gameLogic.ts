import type { Card, Game } from '../types/game';

export function getPairsForLevel(level: number): number {
  const basePairs = 8;
  const increment = Math.floor((level - 1) / 2) * 2;
  return Math.min(basePairs + increment, 20);
}

export function getMaxMovesForLevel(level: number, pairsNeeded: number): number {
  const perfectMoves = pairsNeeded;
  let buffer: number;

  if (level <= 3) {
    buffer = 15;
  } else if (level <= 6) {
    buffer = 12;
  } else if (level <= 10) {
    buffer = 9;
  } else {
    buffer = 6;
  }

  return perfectMoves + buffer;
}

export function createCardPairs(games: Game[]): Card[] {
  const cards: Card[] = [];

  games.forEach(game => {
    const cardData = {
      gameId: game.id,
      name: game.name,
      image: game.background_image,
      isFlipped: false,
      isMatched: false
    };

    cards.push(
      { ...cardData, id: `${game.id}-1` },
      { ...cardData, id: `${game.id}-2` }
    );
  });

  return shuffleArray(cards);
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function checkMatch(card1: Card, card2: Card): boolean {
  return card1.gameId === card2.gameId && card1.id !== card2.id;
}
