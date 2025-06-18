import React, { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';
import { ArrowsContainer, ArrowButtonLeft, ArrowButtonRight } from '../components/ArrowsNav/ArrowsNav';
import { ContactButton } from '@/components/ContactButton/ContactButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import { Box } from '../components/Box/Box'
import { Tab } from '../components/Tab/Tab'
import { areaContent } from './content'
import styles from './SecondSlider.module.scss'
import 'swiper/css'
import 'swiper/css/effect-fade';


export const SecondSlider = () => {
  const swiperRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const isTab = useMediaQuery({query: `(max-width: 1024px)`});
  const isMobile = useMediaQuery({query: `(max-width: 680px)`});

  const [activeTab, setActiveTab] = useState(0);

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
    setCurrentSlide(1);
  }, [activeTab])
  
  return (
    <div className={styles.wrapper}>
      <Box size='m' className={styles.box}>
        <div className={styles.firstColumn}>
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
                    activePhotos.map(item => (
                        <SwiperSlide className={styles.slide}>
                            <img 
                              src={item.photo}
                              alt={areaContent[activeTab].title}
                              className={styles.slideImage}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                isMobile ? (
                    <div className={styles.mobileArrows}>
                        <ArrowsContainer>
                            <ArrowButtonLeft ref={prevButton} />
                            <ArrowButtonRight ref={nextButton} />
                        </ArrowsContainer> 
                        <span className={styles.counter}>
                            {currentSlide} / {totalSlides}
                        </span>
                    </div> 
                )        : (
                    <div className={styles.arrows}>
                        <ArrowsContainer>
                            <ArrowButtonLeft ref={prevButton} />
                            <ArrowButtonRight ref={nextButton} />
                        </ArrowsContainer>
                        <span className={styles.counter}>
                            {currentSlide} / {totalSlides}
                        </span>
                    </div>
                )
            }
        </div>
        <div className={styles.secondColumn}>
            <div className={styles.top}>
                {
                  isTab ? (
                    <h3 className={styles.title}>Квартиры С отделкой</h3>
                  )     : (
                    <h3 className={styles.title}>Квартиры <br /> С отделкой</h3>
                  )
                }
                <div className={styles.tabs}>
                    {areaContent.map((tab, index) => (
                        <Tab 
                          key={index}
                          isActive={activeTab === index}
                          onClick={() => setActiveTab(index)}
                          PreLine={true}
                        >
                        {tab.title}
                        </Tab>
                    ))}
                </div>
                <span className={styles.title}>3 вида</span>
            </div>
        </div>
      </Box>
    </div>
  )
}
