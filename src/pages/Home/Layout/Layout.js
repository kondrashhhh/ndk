import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ArrowsContainer, ArrowButtonLeft, ArrowButtonRight } from '../components/ArrowsNav/ArrowsNav';
import { ContactButton } from '@/components/ContactButton/ContactButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import { Box } from '../components/Box/Box';
import { Tab } from '../components/Tab/Tab';
import { areaContent } from './content';
import styles from './Layout.module.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';

export const Layout = ({ id }) => {
  const swiperRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 680px)` });

  const [activeTab, setActiveTab] = useState(0);
  const [activeArea, setActiveArea] = useState(0);

  // Мемоизация активных данных
  const activeAreas = areaContent[activeTab]?.areas || [];
  const activeAreaPhoto = areaContent[activeTab]?.areas[activeArea]?.photo || '';
  const activePhotos = areaContent[activeTab]?.photos || [];

  const [navReady, setNavReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(activePhotos.length);

  // Предзагрузка изображений
  const preloadImages = useCallback((photos) => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.photo;
    });
  }, []);

  useEffect(() => {
    if (prevButton.current && nextButton.current) {
      setNavReady(true);
    }
  }, []);

  useEffect(() => {
    const changeTab = async () => {
      setIsLoading(true);
      
      // Предзагрузка изображений для нового таба
      preloadImages(areaContent[activeTab]?.photos || []);
      
      if (swiperRef.current) {
        await swiperRef.current.slideTo(0);
        setActiveArea(0);
        setCurrentSlide(1);
        setTotalSlides(areaContent[activeTab]?.photos.length || 0);
      }
      
      setIsLoading(false);
    };
    
    changeTab();
  }, [activeTab, preloadImages]);

  const handleTabChange = useCallback((index) => {
    if (index !== activeTab && !isLoading) {
      setActiveTab(index);
    }
  }, [activeTab, isLoading]);

  const handleAreaChange = useCallback((index) => {
    if (index !== activeArea && !isLoading) {
      setActiveArea(index);
    }
  }, [activeArea, isLoading]);

  const PhotoWrapper = (
    <div className={styles.photoWrapper}>
      {activeAreaPhoto && (
        <img
          src={activeAreaPhoto} 
          alt='area photo' 
          className={styles.areaImage}
          loading='eager'
          key={`${activeTab}-${activeArea}`} // Форсируем перезагрузку при изменении
        />
      )}
    </div>
  );

  const Slider = (
    <Swiper
      className={styles.swiper}
      modules={[Navigation, EffectFade]}
      navigation={navReady ? {
        prevEl: prevButton.current,
        nextEl: nextButton.current,
      } : false}
      onSwiper={(swiper) => swiperRef.current = swiper}
      onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
      onInit={(swiper) => {
        setTotalSlides(swiper.slides.length);
        setCurrentSlide(swiper.realIndex + 1);
      }}                
      followFinger={false}
      simulateTouch={false}
      allowTouchMove={isMobile}
      speed={600}
      spaceBetween={5}
      slidesPerView={1}
      key={`swiper-${activeTab}`} // Форсируем пересоздание Swiper при смене таба
    >
      {activePhotos.map((item, index) => (
        <SwiperSlide className={styles.slide} key={index}>
          <img 
            src={item.photo}
            alt={areaContent[activeTab].title}
            className={styles.slideImage}
            loading='eager'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className={styles.wrapper} id={id}>
      <Box size='m' className={styles.box}>
        <div className={styles.firstColumn}>
          <div className={styles.top}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>Планировки</h3>
            </div>
            <div className={styles.tabs}>
              {areaContent.map((tab, index) => (
                <Tab 
                  key={index}
                  isActive={activeTab === index}
                  onClick={() => handleTabChange(index)}
                  disabled={isLoading}
                >
                  {tab.title}
                </Tab>
              ))}
            </div>
          </div>
          <div className={styles.area}>
            <span className={styles.areaTitle}>Площадь</span>
            <div className={styles.areaTabs}>
              {activeAreas.map((currentArea, index) => (
                <Tab 
                  key={index}
                  isActive={activeArea === index}
                  onClick={() => handleAreaChange(index)}
                  disabled={isLoading}
                >
                  {currentArea.area}
                </Tab>
              ))}
            </div>
            {PhotoWrapper}
          </div>
        </div>
        <div className={styles.secondColumn}>
          {Slider}
          <div className={styles.arrows}>
            <ArrowsContainer>
              <ArrowButtonLeft ref={prevButton} disabled={isLoading} />
              <ArrowButtonRight ref={nextButton} disabled={isLoading} />
            </ArrowsContainer>
            {!isMobile && (
              <span className={styles.counter}>
                {currentSlide} / {totalSlides}
              </span>
            )}
          </div>
          <ContactButton
            className={styles.contact}
            background='orange'
            disabled={isLoading}
          >
            Оставить заявку
          </ContactButton>  
        </div>
      </Box>
    </div>
  );
};