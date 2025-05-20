import React, { useEffect, useState } from 'react';
import { Code, Terminal, Database, GitBranch } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing system...');
  
  useEffect(() => {
    const loadingTexts = [
      'Initializing system...',
      'Loading automata engines...',
      'Preparing visualizations...',
      'Configuring validators...',
      'Almost ready...'
    ];
    
    // Animation for progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    // Animation for loading text
    const textInterval = setInterval(() => {
      const textIndex = Math.min(Math.floor(progress / 20), loadingTexts.length - 1);
      setLoadingText(loadingTexts[textIndex]);
    }, 500);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center z-50">
      <div className="max-w-3xl w-full px-6">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center animate-pulse">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Automata
            </span>
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Visualizer
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { Icon: Terminal, color: 'text-blue-400' },
            { Icon: Code, color: 'text-purple-400' },
            { Icon: Database, color: 'text-pink-400' },
            { Icon: GitBranch, color: 'text-indigo-400' }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center bg-white bg-opacity-10 p-3 rounded-lg animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <item.Icon className={`${item.color} mb-2`} size={32} />
              <div className="h-2 w-16 bg-white bg-opacity-20 rounded-full" />
            </div>
          ))}
        </div>
        
        <div className="h-2 bg-white bg-opacity-20 rounded-full mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-white/70">
          <span>{loadingText}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
} 