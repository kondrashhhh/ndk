import React from 'react'
import { MainLayout } from '@/layouts/MainLayout/MainLayout'
import { TopSection } from './TopSection/TopSection'
import { IntroSlider } from './IntroSlider/IntroSlider'
import styles from './Home.module.scss'

export const Home = () => {
  return (
    <MainLayout>
        <TopSection />
        <IntroSlider />
    </MainLayout>
  )
}
