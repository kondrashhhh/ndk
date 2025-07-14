import React, { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';
import { ArrowsContainer, ArrowButtonLeft, ArrowButtonRight } from '../components/ArrowsNav/ArrowsNav';
import { ContactButton } from '@/components/ContactButton/ContactButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import { Box } from '../components/Box/Box'
import { Tab } from '../components/Tab/Tab'
import { areaContent } from './content'
import styles from './Layout.module.scss'
import 'swiper/css'
import 'swiper/css/effect-fade';

// Компонент для клиентского рендеринга изображений
const ClientOnlyImage = ({ src, alt, className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className={className} style={{ backgroundColor: '#f0f0f0' }} />;

  return <img src={src} alt={alt} className={className} />;
};

export const Layout = ({ id }) => {
  const swiperRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const isMobile = useMediaQuery({query: `(max-width: 680px)`});

  const [activeTab, setActiveTab] = useState(0);
  const [activeArea, setActiveArea] = useState(0);

  const activeAreas = areaContent[activeTab]?.areas || [];
  const activeAreaPhoto = areaContent[activeTab]?.areas[activeArea]?.photo || '';
  const activePhotos = areaContent[activeTab]?.photos || [];

  const [navReady, setNavReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(activePhotos.length);

  useEffect(() => {
    if (prevButton.current && nextButton.current) {
        setNavReady(true);
    }
  }, [prevButton.current, nextButton.current]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
    setActiveArea(0);
    setCurrentSlide(1);
    setTotalSlides(activePhotos.length);
  }, [activeTab, activePhotos.length])

  const PhotoWrapper = 
    <div className={styles.photoWrapper}>
        {
            activeAreaPhoto && (
                <ClientOnlyImage
                    src={activeAreaPhoto} 
                    alt='area photo' 
                    className={styles.areaImage}
                />
            )
        }
    </div>

    const Slider = 
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
        >
            {
                activePhotos.map((item, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <ClientOnlyImage 
                            src={item.photo}
                            alt={areaContent[activeTab].title}
                            className={styles.slideImage}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
  
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
                        onClick={() => setActiveTab(index)}
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
                        onClick={() => setActiveArea(index)}
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
                    <ArrowButtonLeft ref={prevButton} />
                    <ArrowButtonRight ref={nextButton} />
                </ArrowsContainer>
                {
                    !isMobile && (
                        <span className={styles.counter}>
                            {currentSlide} / {totalSlides}
                        </span>
                    )
                }
            </div>
            <ContactButton
              className={styles.contact}
              background='orange'
            >
                Оставить заявку
            </ContactButton>  
        </div>
      </Box>
    </div>
  )
}