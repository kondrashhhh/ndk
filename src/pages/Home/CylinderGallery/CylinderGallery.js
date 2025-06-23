'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useCallback } from 'react'
import styles from './CylinderGallery.module.scss'
import * as THREE from 'three'

function CylinderWithGaps({ radius = 2.25, height = 6 }) {
  const groupRef = useRef()
  const [targetRotation, setTargetRotation] = useState(0)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const autoRotateSpeed = 0.005
  
  const photos = [
    '/home/fade_slider/slide1.png',
    '/home/fade_slider/slide1.png',
    '/home/fade_slider/slide1.png',
    '/home/fade_slider/slide1.png',
    '/home/fade_slider/slide1.png'
  ]

  const textures = useTexture(photos)
  
  const segmentCount = 5
  const gapSize = 0.15
  const tiltAngle = Math.PI / 50

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 680
      setIsMobile(mobile)
      setAutoRotate(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleWheel = useCallback((e) => {
    if (!isMobile) {
      setTargetRotation(prev => prev + e.deltaY * 0.002)
    }
  }, [isMobile])

  const handleTouchStart = useCallback((e) => {
    if (isMobile) {
      setTouchStart(e.touches[0].clientX)
      setAutoRotate(false) 
    }
  }, [isMobile])

  const handleTouchMove = useCallback((e) => {
    if (isMobile && touchStart !== null) {
      const touchEnd = e.touches[0].clientX
      const difference = touchEnd - touchStart
      setTargetRotation(prev => prev + difference * 0.01)
      setTouchStart(touchEnd)
    }
  }, [isMobile, touchStart])

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null)
    if (isMobile) {
      setTimeout(() => setAutoRotate(true), 3000)
    }
  }, [isMobile])

  useEffect(() => {
    const element = document.querySelector(`.${styles.cylinder}`)
    
    if (isMobile) {
      element.addEventListener('touchstart', handleTouchStart)
      element.addEventListener('touchmove', handleTouchMove)
      element.addEventListener('touchend', handleTouchEnd)
    } else {
      window.addEventListener('wheel', handleWheel)
    }
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, isMobile])

  useFrame(() => {
    if (groupRef.current) {
      if (isMobile && autoRotate) {
        setTargetRotation(prev => prev + autoRotateSpeed)
      }
      
      setCurrentRotation(prev => prev + (targetRotation - prev) * 0.1)
      groupRef.current.rotation.y = currentRotation
    }
  })

  return (
    <group>
      <group rotation={[-0.75, 0, 0.5]}>
        <group ref={groupRef}>
          {Array.from({ length: segmentCount }).map((_, i) => {
            const startAngle = (i * (Math.PI * 2 / segmentCount)) + (gapSize / 2)
            const arcLength = (Math.PI * 2 / segmentCount) - gapSize
            
            return (
              <mesh key={i}>
                <cylinderGeometry args={[
                  radius,
                  radius,
                  height,
                  64,
                  1,
                  true,
                  startAngle,
                  arcLength
                ]} />
                <meshStandardMaterial 
                  map={textures[i]}
                  side={THREE.DoubleSide}
                  roughness={0.2}
                />
              </mesh>
            )
          })}
        </group>
      </group>
    </group>
  )
}

export default function CylinderGallery() {
  const height = 6
  
  return (
    <div 
      className={styles.cylinder}
      style={{ touchAction: 'none' }} 
    >
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={0.8} />
        <CylinderWithGaps height={height} />
      </Canvas>
    </div>
  )
}