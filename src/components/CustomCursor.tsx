import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'input' ||
        target.getAttribute('role') === 'button' ||
        target.hasAttribute('tabIndex');
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className="custom-cursor" 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div 
        className="cursor-dot" 
        style={{ 
          transform: isClicking ? 'translate(-50%, -50%) scale(0.5)' : 'translate(-50%, -50%)' 
        }} 
      />
      <div 
        className="cursor-outline" 
        style={{ 
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.2 : 0.5,
          backgroundColor: isHovering ? 'var(--cursor-outline-color)' : 'transparent'
        }} 
      />
    </div>
  );
} 