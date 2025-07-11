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

  const swiperRefText = useRef(null); // TextSlider
  const swiperRefImage = useRef(null); // ImageSlider (ведущий)
  const swiperRefTitle = useRef(null); // TitleSlider

  const [navReady, setNavReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(slides.length);

  const isMobile = useMediaQuery({ maxWidth: 680 });

  // Флаг для предотвращения циклических вызовов slideTo
  const isSyncingRef = useRef(false);

  useEffect(() => {
    if (prevButton.current && nextButton.current) {
      setNavReady(true);
    }
  }, [prevButton.current, nextButton.current]);

  // Обработчик смены слайда у ведущего слайдера (ImageSlider)
  const onImageSlideChange = (swiper) => {
    if (isSyncingRef.current) return;

    isSyncingRef.current = true;

    const index = swiper.realIndex;
    setCurrentSlide(index + 1);

    if (swiperRefText.current && swiperRefText.current.realIndex !== index) {
      swiperRefText.current.slideTo(index);
    }
    if (swiperRefTitle.current && swiperRefTitle.current.realIndex !== index) {
      swiperRefTitle.current.slideTo(index);
    }

    isSyncingRef.current = false;
  };

  // Обработчик смены слайда у ведомых слайдеров (TextSlider, TitleSlider)
  // Просто обновляем currentSlide без переключения ImageSlider
  const onSlaveSlideChange = (swiper) => {
    if (isSyncingRef.current) return;
    setCurrentSlide(swiper.realIndex + 1);
  };

  // === JSX не меняется, только меняем обработчики и навигацию ===

  const TextSlider = (
    <Swiper
      className={styles.textSlider}
      modules={[Navigation]}
      onSwiper={(swiper) => { swiperRefText.current = swiper; }}
      navigation={false} // навигация убрана
      onSlideChange={onSlaveSlideChange}
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
  );

  const ImageSlider = (
    <Swiper
      className={cn(styles.swiper, styles.imageSlider)}
      modules={[Navigation]}
      onSwiper={(swiper) => {
        swiperRefImage.current = swiper;
        setTotalSlides(swiper.slides.length);
        setCurrentSlide(swiper.realIndex + 1);
      }}
      navigation={navReady ? {
        prevEl: prevButton.current,
        nextEl: nextButton.current,
      } : false}
      onSlideChange={onImageSlideChange}
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
              <img src={slide.image} alt="" className={styles.slideImage} />
            </Box>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );

  return (
    <div className={styles.wrapper} id={id}>
      <Box size='m' className={styles.box}>
        <div className={styles.titleWrapper}>
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => { swiperRefTitle.current = swiper; }}
            onSlideChange={onSlaveSlideChange}
            navigation={false} // навигация убрана
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
