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
        width: '40px',   // Ширина одного элемента
        height: '40px',  // Высота одного элемента
        display: 'flex', 
        fontSize: '34px', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: '4px 2px' // 4px сверху/снизу для растягивания по ВЫСОТЕ
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
        backgroundColor: '#ffebee', 
        paddingTop: '350px', 
        paddingBottom: '80px' 
      }}>
        {/* КОНТЕЙНЕР: Ширина 660px гарантирует ровно 15 сердечек в ряд */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '660px', 
          marginBottom: '40px' 
        }}>
          {hearts}
        </div>

        <div style={{ 
          display: 'flex', 
          fontSize: '30px', 
          fontWeight: 'bold', 
          color: '#ad1457',
          marginTop: 'auto',
          paddingBottom: '40px'
        }}>
          <span style={{ color: '#ff1744', marginRight: '15px' }}>{left} дн. осталось</span>
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
