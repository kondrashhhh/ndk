import React, { useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { SliderTab } from './SliderTab/SliderTab';
import { tabsContent } from './content';
import 'swiper/css/effect-fade';  
import styles from './FadeSlider.module.scss'


export const FadeSlider = () => { 
  const swiperRef = useRef(null);
  const swiperRef2 = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const isMobile = useMediaQuery({ query: `(max-width: 680px)` });

  const handleClickChange = (index) => {
    setActiveTab(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
    if (isMobile) {
      if (swiperRef2.current) {
        swiperRef2.current.slideTo(index);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        className={styles.textSlider}
        modules={[EffectFade]}
        effect='fade'
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        followFinger={false}
        simulateTouch={false}
        allowTouchMove={false}
        speed={600}
        slidesPerView={1}
      >
        {tabsContent.map((item, index) => (
          index === 0 ? (
            <SwiperSlide key={index} className={styles.slide}>
              <video
               autoPlay
               loop
               muted
               playsInline
               src={item.slide} 
               alt={item.tab} 
               className={styles.slideImage}
              />
            </SwiperSlide>
          )           :
          (
            <SwiperSlide key={index} className={styles.slide}>
              <img src={item.slide} alt={item.tab} className={styles.slideImage}/>
            </SwiperSlide>
          )
        ))}
      </Swiper>
      
      <div className={styles.tabs}>
        {!isMobile ? (
          tabsContent.map((item, index) => (
            <SliderTab
              key={index}
              isActive={activeTab === index}
              onClick={() => handleClickChange(index)}
            >
              {item.tab}
            </SliderTab>
          ))
        ) : (
          <Swiper
            className={styles.tabSlider}
            onSwiper={(swiper) => { swiperRef2.current = swiper; }}
            speed={600}
            spaceBetween={5}
            slidesPerView={1.35}
            breakpoints={{
              530: { slidesPerView: 2 },
              405: { slidesPerView: 1.5 }
            }}
          >
            {tabsContent.map((item, index) => (
              <SwiperSlide key={index}>
                <SliderTab
                  isActive={activeTab === index}
                  onClick={() => handleClickChange(index)}
                >
                  {item.tab}
                </SliderTab>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}