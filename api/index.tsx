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
    const pastColor = '#ff1744'; // Ярко-красный для прошлого
    const futureColor = '#ffffff'; // Чистый белый для будущего
    const todayColor = '#ffff00'; // Желтый для "сегодня", чтобы выделить в массе
    
    let color = futureColor;
    let scale = '1';
    let opacity = '1';

    if (i < dayOfYear) {
      color = pastColor;
    } else if (i === dayOfYear) {
      color = todayColor;
      scale = '1.4';
    } else {
      // Будущие белые сделаем чуть-чуть прозрачными, чтобы сетка читалась
      opacity = '0.9';
    }
    
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '56px',
        height: '56px',
        display: 'flex', 
        fontSize: '48px', 
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `scale(${scale})`,
        margin: '3px',
        opacity
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
        // СДЕЛАЛ ФОН ТЕМНЕЕ, чтобы белый был виден
        backgroundColor: '#f06292', 
        paddingTop: '380px',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '930px',
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        <div style={{ 
          display: 'flex', 
          fontSize: '34px', 
          fontWeight: 'bold', 
          color: '#ffffff', // Текст теперь тоже белый для стиля
          marginTop: 'auto',
          paddingBottom: '80px'
        }}>
          <span style={{ marginRight: '15px' }}>{left} дн. осталось</span> 
          <span>• {percent}% года</span>
        </div>
      </div>
    ),
    { 
      width: 1170, 
      height: 2532 
    }
  );
}
