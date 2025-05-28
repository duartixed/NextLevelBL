import React, { useEffect, useRef } from 'react';
import '../styles/components/_hero.scss';
import burgersImage from '../assets/images/burgers.png';
import cokeImage from '../assets/images/coke-coca-cola-glass-bottle 1.png';
import friesImage from '../assets/Img_front/best fries.png';

// Duplicar imágenes para forzar scroll si no hay suficiente contenido
const baseImages = [burgersImage, cokeImage, friesImage];
const images = [...baseImages, ...baseImages, ...baseImages];


const Hero = () => {
  const galleryRef = useRef(null);
  const animationRef = useRef();
  // Movimiento infinito: cuando llega al final, vuelve a empezar (efecto carrusel)
  const speed = 1.2; // velocidad más notoria
  useEffect(() => {
    const gallery = galleryRef.current;
    let pos = 0;
    let frame;
    let galleryWidth = 0;
    let parentWidth = 0;

    const updateSizes = () => {
      if (gallery) {
        galleryWidth = gallery.scrollWidth;
        parentWidth = gallery.clientWidth;
      }
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);

    const animate = () => {
      if (gallery) {
        pos += speed;
        if (pos >= galleryWidth - parentWidth) {
          pos = 0; // reinicia para efecto infinito
        }
        gallery.scrollLeft = pos;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  return (
    <section className="hero" style={{ width: '100vw', minWidth: 0, margin: 0, padding: 0, left: 0, position: 'relative' }}>
      <div className="hero-content hero-center" style={{ width: '100vw', minWidth: 0, margin: 0, padding: 0, left: 0 }}>
        <div
          className="hero-horizontal-gallery hero-glow"
          ref={galleryRef}
          style={{ width: '100vw', minWidth: 0, overflow: 'hidden', margin: 0, padding: 0, left: 0 }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Hero ${idx}`}
              className="horizontal-scroll-image"
              style={{ maxWidth: '100%', minWidth: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;