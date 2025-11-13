export interface Game {
  id: number;
  name: string;
  background_image: string;
}

export interface Card {
  id: string;
  gameId: number;
  name: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  matches: number;
  isChecking: boolean;
  gameWon: boolean;
  level: number;
  pairsNeeded: number;
  maxMoves: number;
  gameLost: boolean;
}
