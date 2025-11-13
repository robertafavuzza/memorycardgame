export type ThemeType = 'vaporwave' | 'fantasy' | 'horror' | 'oldstyle' | 'retro';

export interface Theme {
  name: string;
  displayName: string;
  background: string;
  cardBack: string;
  cardBorder: string;
  cardFlippedBorder: string;
  textPrimary: string;
  textSecondary: string;
  textGlow: string;
  buttonGradient: string;
  buttonBorder: string;
  statBox1: string;
  statBox2: string;
  statBox3: string;
  statBorder: string;
  shadow: string;
  winModalBg: string;
  loseModalBg: string;
}

export const themes: Record<ThemeType, Theme> = {
  vaporwave: {
    name: 'vaporwave',
    displayName: 'VAPORWAVE',
    background: 'from-purple-900 via-pink-600 to-cyan-500',
    cardBack: 'from-purple-600 via-pink-500 to-cyan-400',
    cardBorder: 'border-pink-400',
    cardFlippedBorder: 'border-cyan-400',
    textPrimary: 'text-white/70',
    textSecondary: 'text-cyan-200/60',
    textGlow: 'neon-glow',
    buttonGradient: 'from-pink-500 to-cyan-500',
    buttonBorder: 'border-white',
    statBox1: 'from-yellow-400 to-orange-500',
    statBox2: 'from-cyan-400 to-purple-600',
    statBox3: 'from-pink-500 to-cyan-400',
    statBorder: 'border-white',
    shadow: 'shadow-neon-pink',
    winModalBg: 'from-purple-600 to-pink-600',
    loseModalBg: 'from-red-600 to-red-800',
  },
  fantasy: {
    name: 'fantasy',
    displayName: 'FANTASY',
    background: 'from-emerald-900 via-purple-800 to-indigo-900',
    cardBack: 'from-amber-600 via-yellow-500 to-amber-700',
    cardBorder: 'border-amber-400',
    cardFlippedBorder: 'border-emerald-400',
    textPrimary: 'text-amber-100/70',
    textSecondary: 'text-emerald-200/60',
    textGlow: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]',
    buttonGradient: 'from-purple-600 to-emerald-500',
    buttonBorder: 'border-amber-300',
    statBox1: 'from-amber-500 to-yellow-600',
    statBox2: 'from-purple-500 to-indigo-600',
    statBox3: 'from-emerald-500 to-teal-600',
    statBorder: 'border-amber-300',
    shadow: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]',
    winModalBg: 'from-emerald-700 to-purple-700',
    loseModalBg: 'from-slate-700 to-slate-900',
  },
  horror: {
    name: 'horror',
    displayName: 'HORROR',
    background: 'from-black via-red-950 to-gray-900',
    cardBack: 'from-red-900 via-black to-red-950',
    cardBorder: 'border-red-700',
    cardFlippedBorder: 'border-gray-600',
    textPrimary: 'text-red-100/60',
    textSecondary: 'text-gray-400/70',
    textGlow: 'drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]',
    buttonGradient: 'from-red-800 to-black',
    buttonBorder: 'border-red-700',
    statBox1: 'from-red-800 to-red-950',
    statBox2: 'from-gray-800 to-black',
    statBox3: 'from-red-900 to-gray-900',
    statBorder: 'border-red-700',
    shadow: 'shadow-[0_0_25px_rgba(220,38,38,0.6)]',
    winModalBg: 'from-red-900 to-black',
    loseModalBg: 'from-black to-red-950',
  },
  oldstyle: {
    name: 'oldstyle',
    displayName: 'OLD STYLE',
    background: 'from-amber-100 via-yellow-50 to-amber-200',
    cardBack: 'from-amber-800 via-yellow-700 to-amber-900',
    cardBorder: 'border-amber-900',
    cardFlippedBorder: 'border-yellow-800',
    textPrimary: 'text-amber-900/70',
    textSecondary: 'text-yellow-800/70',
    textGlow: 'drop-shadow-[2px_2px_0px_rgba(146,64,14,0.2)]',
    buttonGradient: 'from-amber-700 to-yellow-800',
    buttonBorder: 'border-amber-900',
    statBox1: 'from-amber-600 to-amber-700',
    statBox2: 'from-yellow-600 to-amber-800',
    statBox3: 'from-amber-700 to-yellow-700',
    statBorder: 'border-amber-900',
    shadow: 'shadow-[4px_4px_0px_rgba(146,64,14,0.5)]',
    winModalBg: 'from-amber-700 to-yellow-700',
    loseModalBg: 'from-stone-700 to-amber-900',
  },
  retro: {
    name: 'retro',
    displayName: 'RETRO',
    background: 'from-blue-900 via-slate-800 to-cyan-900',
    cardBack: 'from-orange-600 via-red-600 to-orange-700',
    cardBorder: 'border-orange-500',
    cardFlippedBorder: 'border-cyan-500',
    textPrimary: 'text-orange-100/70',
    textSecondary: 'text-cyan-300/60',
    textGlow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]',
    buttonGradient: 'from-orange-600 to-cyan-600',
    buttonBorder: 'border-orange-400',
    statBox1: 'from-orange-500 to-red-600',
    statBox2: 'from-cyan-500 to-blue-600',
    statBox3: 'from-orange-600 to-cyan-600',
    statBorder: 'border-orange-400',
    shadow: 'shadow-[0_0_15px_rgba(251,146,60,0.5)]',
    winModalBg: 'from-cyan-700 to-orange-700',
    loseModalBg: 'from-slate-800 to-blue-950',
  },
};
