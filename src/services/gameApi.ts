import type { Game } from '../types/game';
import type { ThemeType } from '../types/theme';

const API_KEY = 'a7bbbda5551a49c2826cd3e85a3db86c';
const BASE_URL = 'https://api.rawg.io/api';

const themeQueries: Record<ThemeType, string> = {
  vaporwave: 'cyberpunk,synthwave',
  fantasy: 'fantasy,magic,medieval',
  horror: 'horror,survival-horror,zombie',
  oldstyle: 'retro,classic,arcade',
  retro: 'platformer,indie,pixel-graphics'
};

const genreIds: Record<ThemeType, number> = {
  vaporwave: 51,
  fantasy: 51,
  horror: 3,
  oldstyle: 4,
  retro: 83
};

export async function fetchPopularGames(count: number = 8, theme: ThemeType = 'vaporwave'): Promise<Game[]> {
  try {
    const genreId = genreIds[theme];
    const query = themeQueries[theme];

    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&tags=${query}&page_size=${count}&ordering=-rating&metacritic=75,100`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    const data = await response.json();

    return data.results.map((game: any, index: number) => ({
      id: game.id || index,
      name: game.name || `Game ${index + 1}`,
      background_image: game.background_image || 'https://via.placeholder.com/400x300?text=No+Image'
    }));
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}
