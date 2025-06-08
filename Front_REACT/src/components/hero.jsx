import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/_hero.scss';
import burgersImage from '../assets/images/burgers.png';
import cokeImage from '../assets/images/coke-coca-cola-glass-bottle 1.png';
import friesImage from '../assets/Img_front/best fries.png';

const Hero = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const images = [burgersImage, cokeImage, friesImage];
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      if (!hero) return;
      
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      
      // Update CSS variables for glow effect
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleScroll = () => {
      if (!hero) return;
      const scrolled = window.scrollY;
      hero.style.setProperty('--scroll', `${scrolled * 0.1}`);
    };

    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="light-particles"></div>
      <div className="dynamic-glow"></div>
      <div className="hero-content">
        <div className="hero-horizontal-gallery">
          {duplicatedImages.map((image, index) => (
            <div 
              key={index} 
              className="image-container"
              style={{
                '--rotation': `${Math.random() * 2 - 1}deg`,
                '--delay': `${index * 0.1}s`,
                '--index': index
              }}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="horizontal-scroll-image"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="image-glow"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;