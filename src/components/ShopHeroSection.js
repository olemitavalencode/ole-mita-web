import React, { useState, useEffect, useRef } from 'react';
import BannerSkeleton from './BannerSkeleton';

const ShopHeroSection = ({ bannerVideos, isLoading }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

  // Transición suave entre videos
  useEffect(() => {
    if (!bannerVideos || bannerVideos.length === 0) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Fade in cada vez que el video cambia
    videoElement.style.transition = 'opacity 0.6s';
    videoElement.style.opacity = 0;
    setTimeout(() => {
      videoElement.style.opacity = 0.7; // O el valor que quieras
    }, 60);

    // Al terminar el video, inicia fade out y cambio
    const handleVideoEnd = () => {
      if (isTransitioning) return; // Previene doble transición
      setIsTransitioning(true);
      videoElement.style.opacity = 0; // Empieza fade out

      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % bannerVideos.length);
        setIsTransitioning(false); // Permite la siguiente transición
      }, 600); // Debe coincidir con el tiempo de fade out (0.6s)
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentVideoIndex, bannerVideos, isTransitioning]);

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        bannerVideos && bannerVideos.length > 0 && (
          <video
            key={bannerVideos[currentVideoIndex]} // Esto fuerza el recambio real de video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={bannerVideos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            style={{ opacity: 0.7, transition: 'opacity 0.6s' }}
          />
        )
      )}
    </section>
  );
};

export default ShopHeroSection;
