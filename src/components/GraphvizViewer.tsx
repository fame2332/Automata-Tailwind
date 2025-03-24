import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { Graphviz } from '@hpcc-js/wasm';

// Initialize WASM
Graphviz.load().then(() => {
  Graphviz.useWASM(true);
});

interface GraphvizViewerProps {
  dot: string;
  className?: string;
}

export function GraphvizViewer({ dot, className = '' }: GraphvizViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      graphviz(containerRef.current, { 
        useWorker: false,
        fit: true,
        zoom: true,
        width: "100%",
        height: "100%"
      })
        .renderDot(dot);
    }
  }, [dot]);

  return <div ref={containerRef} className={`${className} overflow-hidden`} />;
}