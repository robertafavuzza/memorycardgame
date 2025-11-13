import { useRef } from 'react';
import type { ThemeType } from '../types/theme';

interface AnimatedBackgroundProps {
  theme: ThemeType;
}

export default function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderVaporwaveElements = () => {
    return (
      <>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-pink-400/20 to-cyan-400/20 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`grid-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"
            style={{
              top: `${(i + 1) * 12.5}%`,
              animation: `shimmer ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </>
    );
  };

  const renderFantasyElements = () => {
    return (
      <>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3,
            }}
          >
            ✨
          </div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`castle-${i}`}
            className="absolute text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.15,
            }}
          >
            {i % 3 === 0 ? '🏰' : i % 3 === 1 ? '🌙' : '🔮'}
          </div>
        ))}
      </>
    );
  };

  const renderHorrorElements = () => {
    return (
      <>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift ${Math.random() * 20 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.2,
            }}
          >
            {i % 4 === 0 ? '💀' : i % 4 === 1 ? '👻' : i % 4 === 2 ? '🦇' : '🕷️'}
          </div>
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`fog-${i}`}
            className="absolute w-96 h-96 rounded-full bg-gray-500/10 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fog ${Math.random() * 30 + 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </>
    );
  };

  const renderOldStyleElements = () => {
    return (
      <>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentle-float ${Math.random() * 12 + 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: 0.15,
            }}
          >
            {i % 5 === 0 ? '📜' : i % 5 === 1 ? '🕯️' : i % 5 === 2 ? '📖' : i % 5 === 3 ? '🖋️' : '⚜️'}
          </div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`ornament-${i}`}
            className="absolute text-6xl text-amber-900/10"
            style={{
              left: `${i * 12.5}%`,
              top: `${Math.random() * 100}%`,
              animation: `rotate-slow ${Math.random() * 40 + 30}s linear infinite`,
            }}
          >
            ❧
          </div>
        ))}
      </>
    );
  };

  const renderRetroElements = () => {
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: i % 2 === 0 ? '-10%' : '110%',
              top: `${Math.random() * 100}%`,
              animation: `pacman ${Math.random() * 8 + 6}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.2,
              transform: i % 2 === 0 ? 'scaleX(1)' : 'scaleX(-1)',
            }}
          >
            {i % 3 === 0 ? '👾' : i % 3 === 1 ? '🕹️' : '🎮'}
          </div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`pixel-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400/30 to-red-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `blink ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </>
    );
  };

  const renderElements = () => {
    switch (theme) {
      case 'vaporwave':
        return renderVaporwaveElements();
      case 'fantasy':
        return renderFantasyElements();
      case 'horror':
        return renderHorrorElements();
      case 'oldstyle':
        return renderOldStyleElements();
      case 'retro':
        return renderRetroElements();
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {renderElements()}
    </div>
  );
}
