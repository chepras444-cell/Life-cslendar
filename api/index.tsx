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
    const color = i < dayOfYear ? '#ef5350' : (i === dayOfYear ? '#ff1744' : '#ffcdd2');
    const symbol = i <= dayOfYear ? '♥' : '♡';
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '30px', 
        height: '30px', 
        display: 'flex', 
        fontSize: '22px', 
        justifyContent: 'center' 
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
        padding: '20px'
      }}>
        {/* Контейнер сердечек сделан узким (650px), чтобы они уходили вниз */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '650px', 
          marginBottom: '80px' 
        }}>
          {hearts}
        </div>

        {/* Текст теперь тоже вертикальный */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          fontWeight: 'bold', 
          color: '#ad1457' 
        }}>
          <div style={{ fontSize: '60px', color: '#ff1744', marginBottom: '10px' }}>
            {left} дн. осталось
          </div>
          <div style={{ fontSize: '40px', opacity: 0.8 }}>
            {percent}% года
          </div>
        </div>
      </div>
    ),
    { width: 1170, height: 2532 }
  );
}
