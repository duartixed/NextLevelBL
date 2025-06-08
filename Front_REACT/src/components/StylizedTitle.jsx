import React, { useRef, useState } from 'react';
import '../styles/components/StylizedTitle.scss';

const StylizedTitle = ({ title, subtitle }) => {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });

    // Parallax effect for title
    const moveX = (x - 50) * 0.5;
    const moveY = (y - 50) * 0.5;
    titleRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${moveY * 0.1}deg) rotateY(${-moveX * 0.1}deg)`;
  };

  return (
    <div className="stylized-title-container" onMouseMove={handleMouseMove}>
      <div className="stylized-title-content">
        <div className="title-particles"></div>
        <h1 className="main-title" ref={titleRef}>{title}</h1>
        {subtitle && <div className="sub-title">{subtitle}</div>}
        <div className="title-decoration"></div>
        <div className="title-glow" style={{
          '--glow-x': `${mousePosition.x}%`,
          '--glow-y': `${mousePosition.y}%`
        }}></div>
      </div>
    </div>
  );
};

export default StylizedTitle;
