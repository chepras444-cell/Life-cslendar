import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = { runtime: 'edge' };

export default function handler() {
  const now = new Date();
  const year = now.getFullYear();
  // Проверка на високосный год
  const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const daysInYear = isLeap ? 366 : 365;
  
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const left = daysInYear - dayOfYear - 1;
  const percent = Math.floor((dayOfYear / daysInYear) * 100);

  const hearts = [];
  for (let i = 0; i < daysInYear; i++) {
    let color = '#ffcdd2'; // Будущее
    let symbol = '♡';
    
    if (i < dayOfYear) {
      color = '#ef5350'; // Прошлое
      symbol = '♥';
    } else if (i === dayOfYear) {
      color = '#ff1744'; // Сегодня
      symbol = '♥';
    }
    
    hearts.push(
      <div key={i} style={{
        color: color,
        width: '24px',
        height: '24px',
        display: 'flex',
        fontSize: '18px',
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'center',
        backgroundColor: '#ffebee',
        padding: '50px'
      }}>
        {/* Контейнер для сердечек с ПЕРЕНОСОМ (wrap) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '1000px', 
          marginBottom: '60px' 
        }}>
          {hearts}
        </div>

        {/* Текст под сердечками */}
        <div style={{ 
          display: 'flex', 
          fontSize: '45px', 
          fontWeight: 'bold', 
          color: '#ad1457' 
        }}>
          <span style={{ color: '#ff1744', marginRight: '20px' }}>{left} дн. осталось</span>
          <span> • {percent}% года</span>
        </div>
      </div>
    ),
    { 
      width: 1170, 
      height: 2532 
    }
  );
}
