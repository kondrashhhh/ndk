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

export const IntroSlider = () => {
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
      if (prevButton.current && nextButton.current) {
          setNavReady(true);
      }
  }, [prevButton.current, nextButton.current]);

  const isMobile = useMediaQuery({ maxWidth: 680 });


  return (
    <div className={styles.wrapper}>
        <Box size='m' className={styles.box}>
            <div className={styles.titleWrapper}>
                <h3 className={styles.title}>МНОГОУРОВНЕВАЯ ПОДСВЕТКА</h3>
            </div>
            <div className={styles.sliders}>
                    <Swiper
                        className={styles.textSlider}
                        modules={[Navigation]}
                        onSwiper={(swiper) => { swiperRef1.current = swiper; }}
                        navigation={navReady ? {
                            prevEl: prevButton.current,
                            nextEl: nextButton.current,
                        } : false}
                        followFinger={false}
                        simulateTouch={false}
                        allowTouchMove={false}
                        speed={600}
                        spaceBetween={150}
                        slidesPerView={1}
                    >
                        {
                            slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <span className={styles.textSlide}>{slide.text}</span>
                                </SwiperSlide>
                            ))
                        }
                        <ArrowsContainer className={styles.buttons}>
                            <ArrowButtonLeft ref={prevButton} />
                            <ArrowButtonRight ref={nextButton} />
                        </ArrowsContainer>
                    </Swiper>
                    <Swiper
                        className={cn(styles.swiper, styles.imageSlider)}
                        modules={[Navigation]}
                        onSwiper={(swiper) => { swiperRef2.current = swiper; }}
                        navigation={navReady ? {
                            prevEl: prevButton.current,
                            nextEl: nextButton.current,
                        } : false}
                        followFinger={false}
                        simulateTouch={false}
                        allowTouchMove={false}
                        speed={600}
                        spaceBetween={5}
                        slidesPerView={1.25}
                        breakpoints={{
                            1400: {
                                slidesPerView: 1.5,
                                spaceBetween: 50,
                            },
                            680: {
                                slidesPerView: 1.1,
                                spaceBetween: 50,
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
            </div>
        </Box>
        <div className={styles.borderLeft}></div>
    </div>
  )
}
