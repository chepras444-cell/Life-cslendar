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
    let color = '#ffcdd2'; // future
    let symbol = '♡';
    let scale = '1';

    if (i < dayOfYear) {
      color = '#ef5350'; // past
      symbol = '♥';
    } else if (i === dayOfYear) {
      color = '#ff1744'; // today
      symbol = '♥';
      scale = '1.3'; // Увеличение сегодняшнего дня, как в твоем стиле
    }
    
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '42px', 
        height: '42px', 
        display: 'flex', 
        fontSize: '32px', 
        justifyContent: 'center', 
        alignItems: 'center',
        transform: `scale(${scale})`,
        margin: '2px' 
      }}>
        {symbol}
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
        paddingBottom: '100px',
        fontFamily: 'sans-serif'
      }}>
        {/* СЕТКА: ровно 15 в ряд за счет ширины 690px (15 элементов по 46px) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '690px', 
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
          marginTop: 'auto',
          paddingBottom: '60px'
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
