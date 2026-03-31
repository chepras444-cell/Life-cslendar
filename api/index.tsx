import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = { runtime: 'edge' };

export default function handler() {
  const now = new Date();
  const year = now.getFullYear();
  const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const daysInYear = isLeap ? 366 : 365;
  
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const left = daysInYear - dayOfYear - 1;
  const percent = Math.floor((dayOfYear / daysInYear) * 100);

  const hearts = [];
  for (let i = 0; i < daysInYear; i++) {
    let color = 'rgba(255, 205, 210, 0.3)'; // РЕШЕНИЕ ПРОБЛЕМЫ "КВАДРАТИКОВ": Бледное закрашенное сердечко для будущего
    let scale = '1';

    if (i < dayOfYear) {
      color = '#ef5350'; // past
    } else if (i === dayOfYear) {
      color = '#ff1744'; // today
      scale = '1.3'; // Увеличение сегодняшнего дня
    }
    
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '56px',  // УВЕЛИЧЕННЫЙ РАЗМЕР СЕРДЕЧКА (было ~40px)
        height: '56px', // УВЕЛИЧЕННЫЙ РАЗМЕР СЕРДЕЧКА
        display: 'flex', 
        fontSize: '48px', // УВЕЛИЧЕННЫЙ ШРИФТ ДЛЯ БОЛЬШЕГО СЕРДЕЧКА
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `scale(${scale})`,
        margin: '3px'   // Чуть больше отступа для растягивания
      }}>
        ♥ {/* ВСЕГДА ИСПОЛЬЗУЕМ ЗАПОЛНЕННОЕ СЕРДЕЧКО, ЧТОБЫ IPHONE НЕ ПОКАЗЫВАЛ КВАДРАТЫ */}
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={{ 
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#ffebee', // var(--bg)
        paddingTop: '380px', // Отступ под часы iPhone
        paddingBottom: '80px',
        fontFamily: 'sans-serif'
      }}>
        {/* СЕТКА: 15 в ряд, но теперь шире (930px), чтобы большие сердечки влезли */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '930px',  // УВЕЛИЧЕННАЯ ШИРИНА СЕТКИ (15 шт * 62px)
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* ФУТЕР (Текст внизу) */}
        <div style={{ 
          display: 'flex', 
          fontSize: '32px', 
          fontWeight: '600', 
          color: '#ad1457', // var(--text)
          marginTop: 'auto', // Опускает текст максимально вниз
          paddingBottom: '80px' // Отступ от самого низа экрана
        }}>
          <span style={{ color: '#ff1744', fontWeight: 'bold', marginRight: '15px' }}>
            {left} дн. осталось
          </span> 
          <span style={{ opacity: 0.8 }}>• {percent}% года</span>
        </div>
      </div>
    ),
    { 
      width: 1170, 
      height: 2532 
    }
  );
}
