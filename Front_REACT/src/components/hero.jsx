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
  const speed = 1.2; // velocidad más notoria

  useEffect(() => {
    const gallery = galleryRef.current;
    let pos = 0;
    let frame;

    const animate = () => {
      if (gallery) {
        pos += speed;
        if (pos >= gallery.scrollWidth - gallery.clientWidth) {
          pos = 0; // reinicia para efecto infinito
        }
        gallery.scrollLeft = pos;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-horizontal-gallery" ref={galleryRef}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`Hero ${idx}`} className="horizontal-scroll-image" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;