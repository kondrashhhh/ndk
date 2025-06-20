import React from 'react'
import { MainLayout } from '@/layouts/MainLayout/MainLayout'
import { TopSection } from './TopSection/TopSection'
import { IntroSlider } from './IntroSlider/IntroSlider'
import { AutoSlider } from './AutoSlider/AutoSlider'
import { Layout } from './Layout/Layout'
import { Boxes } from './Boxes/Boxes'
import { SecondSlider } from './SecondSlider/SecondSlider'
import { Map } from './Map/Map'
import { FadeSlider } from './FadeSlider/FadeSlider'
import { Animation } from './Animation/Animation'
import styles from './Home.module.scss'


export const Home = () => {
  return (
    <MainLayout>
      <TopSection />
      <IntroSlider />
      <AutoSlider />
      <Layout />
      <Boxes />
      <SecondSlider />
      <Map />
      <FadeSlider />
      <Animation />
    </MainLayout>
  )
}
