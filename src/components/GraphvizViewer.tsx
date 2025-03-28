import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { Graphviz } from '@hpcc-js/wasm';
import { useTheme } from '../contexts/ThemeContext';

// Initialize WASM
await Graphviz.load();

interface GraphvizViewerProps {
  dot: string;
  className?: string;
}

export function GraphvizViewer({ dot, className = '' }: GraphvizViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      // Add dark mode styles to the DOT string
      let modifiedDot = dot;
      if (theme === 'dark') {
        // Insert dark mode attributes after the first '{'
        modifiedDot = dot.replace(
          '{',
          '{ bgcolor="transparent" node [color="white" fontcolor="white"] edge [color="white" fontcolor="white"]'
        );
      }

      graphviz(containerRef.current, { 
        useWorker: false,
        fit: true,
        zoom: true,
        width: "100%",
        height: "100%",
        bgcolor: theme === 'dark' ? 'transparent' : 'white'
      })
        .renderDot(modifiedDot);
    }
  }, [dot, theme]);

  return <div ref={containerRef} className={`${className} overflow-hidden`} />;
}