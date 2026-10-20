import React from 'react';

interface WaveformProps {
  isActive: boolean;
  color?: string;
}

export const Waveform: React.FC<WaveformProps> = ({ isActive, color = 'bg-teal-500' }) => {
  // 14 bars with varying baseline heights for natural speech look
  const heights = [35, 60, 45, 80, 100, 70, 90, 85, 95, 65, 75, 50, 40, 30];

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 h-10 sm:h-14 w-full max-w-xs mx-auto my-3">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`${color} w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
            isActive ? 'animate-waveform-bar' : 'h-1.5 opacity-40'
          }`}
          style={
            isActive
              ? {
                  height: `${h}%`,
                  animationDelay: `${(i % 5) * 0.12}s`,
                  animationDuration: `${0.5 + (i % 3) * 0.2}s`,
                }
              : { height: '6px' }
          }
        />
      ))}
    </div>
  );
};
