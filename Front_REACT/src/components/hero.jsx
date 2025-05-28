import React, { useEffect, useRef } from 'react';
import '../styles/components/_hero.scss';
import burgersImage from '../assets/images/burgers.png';
import cokeImage from '../assets/images/coke-coca-cola-glass-bottle 1.png';
import friesImage from '../assets/Img_front/best fries.png';

const images = [
  burgersImage, cokeImage, friesImage,
  burgersImage, cokeImage, friesImage,
  burgersImage, cokeImage, friesImage
];

const Hero = () => {
  const galleryRef = useRef(null);
  const animationRef = useRef();
  const directionRef = useRef(1);

  useEffect(() => {
    const gallery = galleryRef.current;
    let pos = 0;
    let max = 0;
    let min = 0;
    let speed = 0.7; // velocidad de movimiento horizontal

    const updateMax = () => {
      if (gallery) {
        const galleryWidth = gallery.scrollWidth;
        const parentWidth = gallery.offsetWidth;
        max = Math.max(0, galleryWidth - parentWidth);
        min = 0;
      }
    };
    updateMax();
    window.addEventListener('resize', updateMax);

    const animate = () => {
      if (gallery) {
        pos += speed * directionRef.current;
        if (pos > max) {
          pos = max;
          directionRef.current = -1;
        } else if (pos < min) {
          pos = min;
          directionRef.current = 1;
        }
        gallery.scrollLeft = pos;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateMax);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-content hero-center">
        <div
          className="hero-horizontal-gallery hero-glow"
          ref={galleryRef}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Hero ${idx}`}
              className="horizontal-scroll-image"
            />
          ))}
        </div>
      </div>
      {/* Puedes agregar la galería horizontal aquí si lo deseas */}
    </section>
  );
};

export default Hero;