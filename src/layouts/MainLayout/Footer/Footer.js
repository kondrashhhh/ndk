import React from 'react'
import { Projects } from './Projects/Projects';
import styles from './Footer.module.scss'

export const Footer = () => {
  const navItems = [
    {title: '© uytny, 2025', url: ''},
    {title: 'Политика конфиденциальности', url: '/'},
    {title: 'DDq – Создание сайта', url: ''},
  ];

  return (
    <div className={styles.wrapper}>
      <ul className={styles.navigation}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={styles.item}
          >
            {item.url ? (
              <a href={item.url}>{item.title}</a>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
      <Projects>Посмотреть <br /> другие проекты</Projects>
    </div>
  )
}
