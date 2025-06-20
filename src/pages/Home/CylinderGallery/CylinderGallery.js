'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import styles from './CylinderGallery.module.scss'
import * as THREE from 'three'

function CylinderWithGaps({ radius = 2.25, height = 6 }) {
  const groupRef = useRef()
  const [targetRotation, setTargetRotation] = useState(0)
  const [currentRotation, setCurrentRotation] = useState(0)
  
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

  // Обработчик скролла
  useEffect(() => {
    const handleWheel = (e) => {
      setTargetRotation(prev => prev + e.deltaY * 0.002)
    }
    
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
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
    >
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={0.8} />
        <CylinderWithGaps height={height} />
      </Canvas>
    </div>
  )
}