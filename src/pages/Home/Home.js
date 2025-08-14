import React, { forwardRef } from 'react';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { TopSection } from './TopSection/TopSection';
import { IntroSlider } from './IntroSlider/IntroSlider';
import { AutoSlider } from './AutoSlider/AutoSlider';
import { Layout } from './Layout/Layout';
import { Boxes } from './Boxes/Boxes';
import { SecondSlider } from './SecondSlider/SecondSlider';
import { Map } from './Map/Map';
import { FadeSlider } from './FadeSlider/FadeSlider';
import { Animation } from './Animation/Animation';
import styles from './Home.module.scss';

const Home = forwardRef(({ initialSlide = 0, animationRef }, ref) => {
  return (
    <MainLayout>
      <TopSection />
      <IntroSlider id='about' />
      <AutoSlider />
      <Layout id='layouts' />
      <Boxes id='mortgage' />
      <SecondSlider id='finishing' />
      <Map id='map' />
      <div ref={ref}>
        <FadeSlider initialSlide={initialSlide} />
      </div>
      <div ref={animationRef}>
        <Animation />
      </div>
    </MainLayout>
  );
});

Home.displayName = 'Home';

export { Home };