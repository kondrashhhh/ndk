import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef } from 'react';
import { Home } from '@/pages/Home/Home';

export default function SlidePage() {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const { slideId } = router.query;
  const fadeSliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!slideId) return;

    const slideNumber = parseInt(slideId);
    const targetRef = slideNumber === 6 ? animationRef : fadeSliderRef;
    
    if (targetRef.current) {
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      const offset = isMobile ? -600 : 0; 
      
      window.scrollTo({
        top: offsetPosition - offset,
        behavior: 'smooth'
      });
    }
  }, [slideId, isMobile]);

  return (
    <Home 
      ref={fadeSliderRef} 
      animationRef={animationRef}
      initialSlide={slideId ? parseInt(slideId) : 0} 
    />
  );
}