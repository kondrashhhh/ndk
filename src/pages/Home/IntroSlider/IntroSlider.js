import React, { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import cn from 'classnames'
import 'swiper/css'
import { Box } from '../components/Box/Box'
import { slides } from './content'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowsContainer, ArrowButtonLeft, ArrowButtonRight } from '../components/ArrowsNav/ArrowsNav';
import styles from './IntroSlider.module.scss'

export const IntroSlider = ({ id }) => {
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const swiperRef1 = useRef(null); // TextSlider
  const swiperRef2 = useRef(null); // ImageSlider
  const swiperRef3 = useRef(null); // TitleSlider

  const [navReady, setNavReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(slides.length);

  useEffect(() => {
    if (prevButton.current && nextButton.current) {
      setNavReady(true);
    }
  }, [prevButton.current, nextButton.current]);

  const isMobile = useMediaQuery({ maxWidth: 680 });

  const syncSwipers = (activeIndex) => {
    if (swiperRef1.current && isMobile) swiperRef1.current.slideTo(activeIndex);
    if (swiperRef2.current && isMobile) swiperRef2.current.slideTo(activeIndex);
    if (swiperRef3.current && isMobile) swiperRef3.current.slideTo(activeIndex);
    setCurrentSlide(activeIndex + 1);
  };

  const handleSlideChange = (swiper) => {
    syncSwipers(swiper.realIndex);
    console.log(currentSlide)
  };

  const TextSlider = 
    <Swiper
      className={styles.textSlider}
      modules={[Navigation]}
      onSwiper={(swiper) => { swiperRef1.current = swiper; }}
      navigation={navReady ? {
        prevEl: prevButton.current,
        nextEl: nextButton.current,
      } : false}
      onSlideChange={handleSlideChange}
      followFinger={false}
      simulateTouch={false}
      allowTouchMove={false}
      speed={600}
      spaceBetween={150}
      slidesPerView={1}
    >
      {
        slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.textSliderSlide}>
            <span className={styles.textSlide}>{slide.text}</span>
          </SwiperSlide>
        ))
      }
      <div className={styles.arrows}>
        <ArrowsContainer className={styles.buttons}>
          <ArrowButtonLeft ref={prevButton} />
          <ArrowButtonRight ref={nextButton} />
        </ArrowsContainer>
        <span className={styles.counter}>
          {currentSlide} / {totalSlides}
        </span>
      </div>
    </Swiper>

  const ImageSlider = 
    <Swiper
      className={cn(styles.swiper, styles.imageSlider)}
      modules={[Navigation]}
      onSwiper={(swiper) => { 
        swiperRef2.current = swiper;
        setTotalSlides(swiper.slides.length);
        setCurrentSlide(swiper.realIndex + 1);
      }}
      navigation={navReady ? {
        prevEl: prevButton.current,
        nextEl: nextButton.current,
      } : false}
      onSlideChange={handleSlideChange}
      onInit={(swiper) => {
        setTotalSlides(swiper.slides.length);
        setCurrentSlide(swiper.realIndex + 1);
      }}
      followFinger={isMobile}
      simulateTouch={isMobile} 
      allowTouchMove={isMobile} 
      speed={600}
      spaceBetween={5}
      slidesPerView={1.01}
      breakpoints={{
        1400: {
          slidesPerView: 1.5,
          spaceBetween: 51,
          allowTouchMove: false,
        },
        680: {
          slidesPerView: 1.1,
          spaceBetween: 50,
          allowTouchMove: false,
        }
      }}
    >
      {
        slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box className={styles.slideBox}>
              <img src={slide.image} alt="" className={styles.slideImage}/>
            </Box>
          </SwiperSlide>
        ))
      }
    </Swiper>

  return (
    <div className={styles.wrapper} id={id}>
      <Box size='m' className={styles.box}>
        <div className={styles.titleWrapper}>
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => { swiperRef3.current = swiper; }}
            onSlideChange={handleSlideChange}
            navigation={navReady ? {
              prevEl: prevButton.current,
              nextEl: nextButton.current,
            } : false}
            followFinger={false}
            simulateTouch={false}
            allowTouchMove={false}
            speed={600}
            slidesPerView={1}
          >
            {
              slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <h3 className={styles.title}>{slide.title}</h3>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className={styles.sliders}>
          {isMobile ? (
            <>
              {ImageSlider}
              {TextSlider}
            </>
          ) : (
            <>
              {TextSlider}
              {ImageSlider}
            </>
          )}
        </div>
      </Box>
      <div className={styles.borderLeft}></div>
    </div>
  )
}