import { Palette } from 'lucide-react';
import { useState } from 'react';
import type { ThemeType, Theme } from '../types/theme';

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  theme: Theme;
}

const themeOptions: { value: ThemeType; label: string; icon: string }[] = [
  { value: 'vaporwave', label: 'Vaporwave', icon: '🌸' },
  { value: 'fantasy', label: 'Fantasy', icon: '🧙' },
  { value: 'horror', label: 'Horror', icon: '👻' },
  { value: 'oldstyle', label: 'Old Style', icon: '📜' },
  { value: 'retro', label: 'Retro', icon: '🕹️' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange, theme }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-12 h-12 sm:w-16 sm:h-16
          bg-gradient-to-br ${theme.buttonGradient}
          text-white rounded-full
          border-2 sm:border-4 ${theme.buttonBorder} ${theme.shadow}
          hover:scale-110 hover:rotate-12
          transition-all duration-300
          flex items-center justify-center
        `}
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5 sm:w-7 sm:h-7" />
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border-2 ${theme.cardBorder} overflow-hidden min-w-[150px] sm:min-w-[180px]`}>
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onThemeChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 sm:px-4 py-2 sm:py-3 text-left
                flex items-center gap-2 sm:gap-3
                transition-colors duration-200
                text-sm sm:text-base font-bold
                ${
                  currentTheme === option.value
                    ? `bg-gradient-to-r ${theme.buttonGradient} text-white`
                    : 'text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-base sm:text-xl">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
