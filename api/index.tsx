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
    // НАСТРОЙКИ ЦВЕТОВ
    const pastColor = '#ef5350';   // Насыщенный красный (прошлое)
    const todayColor = '#ff1744';  // Яркий красный (сегодня)
    const futureColor = '#ffffff'; // Чистый белый (будущее)
    
    let color = futureColor;
    let scale = '1';
    let border = 'none';

    if (i < dayOfYear) {
      color = pastColor;
    } else if (i === dayOfYear) {
      color = todayColor;
      scale = '1.4';
    } else {
      // Добавляем тонкую розовую обводку белым сердечкам, чтобы они были видны
      border = '1px solid #ffcdd2';
    }
    
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '50px',
        height: '50px',
        display: 'flex', 
        fontSize: '42px', 
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `scale(${scale})`,
        margin: '4px',
        // Тень для белых сердечек, чтобы они "горели" на фоне
        textShadow: i > dayOfYear ? '0 0 2px rgba(173, 20, 87, 0.2)' : 'none'
      }}>
        ♥
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
        backgroundColor: '#ffebee', // Возвращаем приятный светлый фон
        paddingTop: '380px',
        fontFamily: 'sans-serif'
      }}>
        {/* СЕТКА */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '900px',
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* ТЕКСТ */}
        <div style={{ 
          display: 'flex', 
          fontSize: '34px', 
          fontWeight: 'bold', 
          color: '#ad1457',
          marginTop: 'auto',
          paddingBottom: '100px'
        }}>
          <span style={{ color: '#ff1744', marginRight: '15px' }}>{left} дн. осталось</span> 
          <span>• {percent}% года</span>
        </div>
      </div>
    ),
    { width: 1170, height: 2532 }
  );
}
