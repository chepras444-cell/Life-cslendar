import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = { runtime: 'edge' };

export default function handler() {
  const now = new Date();
  const year = now.getFullYear();
  
  // Проверка на високосный год для точности
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
    
    // Каждое сердечко в блоке 26x26 пикселей
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '26px', 
        height: '26px', 
        display: 'flex', 
        fontSize: '20px', 
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
        backgroundColor: '#ffebee', 
        // ОТСТУП СВЕРХУ ПОД ЧАСЫ (350px)
        paddingTop: '350px', 
        paddingBottom: '100px' 
      }}>
        {/* СЕТКА СЕРДЕЧЕК */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          // ШИРИНА ПОД 15 СЕРДЕЧЕК (15 * 26px = 390px)
          width: '390px', 
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* НИЖНИЙ ТЕКСТ */}
        <div style={{ 
          display: 'flex', 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#ad1457',
          // ОТСТУП ДО ТЕКСТА, ЧТОБЫ ОН БЫЛ НАД ДОКОМ
          marginTop: '150px'
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
