import React, { useState, useEffect, useRef } from 'react'
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


export const Layout = () => {
  const swiperRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);

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
    swiperRef.current.slideTo(0);
    setActiveArea(0);
    setCurrentSlide(1);
    setTotalSlides(activePhotos.length);
  }, [activeTab])
  
  return (
    <div className={styles.wrapper}>
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
                <div className={styles.photoWrapper}>
                    {
                        activeAreaPhoto && (
                            <img
                             src={activeAreaPhoto} 
                             alt='area photo' 
                             loading='lazy'
                             className={styles.areaImage}
                            />
                        )
                    }
                </div>
            </div>
        </div>
        <div className={styles.secondColumn}>
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
                allowTouchMove={false}
                speed={600}
                spaceBetween={5}
                slidesPerView={1}
            >
                {
                    activePhotos.map((item, index) => (
                        <SwiperSlide className={styles.slide} key={index}>
                            <img 
                              src={item.photo}
                              alt={areaContent[activeTab].title}
                              className={styles.slideImage}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className={styles.arrows}>
                <ArrowsContainer>
                    <ArrowButtonLeft ref={prevButton} />
                    <ArrowButtonRight ref={nextButton} />
                </ArrowsContainer>
                <span className={styles.counter}>
                    {currentSlide} / {totalSlides}
                </span>
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
