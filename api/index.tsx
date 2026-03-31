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
    const colorPast = '#ef5350'; 
    const colorToday = '#ff1744';
    const colorFutureContour = '#ffcdd2'; // Нежный розовый контур для будущего

    if (i < dayOfYear) {
      // ПРОШЛОЕ: Закрашенное красное сердечко
      hearts.push(
        <div key={i} style={{ color: colorPast, width: '50px', height: '50px', display: 'flex', fontSize: '42px', justifyContent: 'center', alignItems: 'center', margin: '4px' }}>
          ♥
        </div>
      );
    } else if (i === dayOfYear) {
      // СЕГОДНЯ: Увеличенное красное сердечко
      hearts.push(
        <div key={i} style={{ color: colorToday, width: '50px', height: '50px', display: 'flex', fontSize: '42px', justifyContent: 'center', alignItems: 'center', margin: '4px', transform: 'scale(1.4)' }}>
          ♥
        </div>
      );
    } else {
      // БУДУЩЕЕ: Контурное сердечко через SVG (100% стабильность)
      hearts.push(
        <div key={i} style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={colorFutureContour} strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
    }
  }

  return new ImageResponse(
    (
      <div style={{ 
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#ffebee', 
        paddingTop: '380px',
        fontFamily: 'sans-serif'
      }}>
        {/* СЕТКА: Ровно 15 в ряд благодаря ширине 900px */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '900px',
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* НИЖНИЙ ТЕКСТ */}
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
    { 
      width: 1170, 
      height: 2532 
    }
  );
}
