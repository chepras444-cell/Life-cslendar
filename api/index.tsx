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
    
    // ОГРОМНЫЙ РАЗМЕР (40x40 пикселей) И ПЛОТНОЕ РАСПОЛОЖЕНИЕ
    hearts.push(
      <div key={i} style={{ 
        color, 
        width: '40px', 
        height: '40px', 
        display: 'flex', 
        fontSize: '34px', // Шрифт чуть меньше блока для аккуратности
        justifyContent: 'center', 
        alignItems: 'center',
        margin: '1px' // Крошечный отступ между сердечками
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
        paddingTop: '350px', // Отступ под часы
        paddingBottom: '100px' 
      }}>
        {/* СЕТКА СЕРДЕЧЕК: Огромная, плотная, на весь экран */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          // Увеличил ширину сетки до 950px, чтобы огромные сердечки плотно заполнили экран
          width: '950px', 
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* НИЖНИЙ ТЕКСТ: Как на референсе */}
        <div style={{ 
          display: 'flex', 
          fontSize: '30px', 
          fontWeight: 'bold', 
          color: '#ad1457',
          marginTop: 'auto', // Опускаем текст максимально вниз
          paddingBottom: '20px'
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
