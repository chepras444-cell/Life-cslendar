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
    const pastColor = '#ef5350'; // Яркий красный для прошлого
    const futureColor = '#ffffff'; // РЕШЕНИЕ ПРОБЛЕМЫ "БЛЕДНОСТИ": Чистый белый для будущего
    const todayColor = '#ff1744'; // Самый яркий для сегодня
    
    let color = futureColor; // По умолчанию - будущее
    let scale = '1';
    let shadow = 'none'; // Тень только для белых сердечек

    if (i < dayOfYear) {
      color = pastColor; // past
    } else if (i === dayOfYear) {
      color = todayColor; // today
      scale = '1.3'; // Увеличение сегодняшнего дня
    } else {
      // КРОШЕЧНАЯ ТЕНЬ ДЛЯ БЕЛЫХ СЕРДЕЧЕК, ЧТОБЫ ОНИ НЕ СЛИВАЛИСЬ С РОЗОВЫМ ФОНОМ
      shadow = '0px 1px 2px rgba(0, 0, 0, 0.05)'; 
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
        textShadow: shadow // ТЕНЬ ДЛЯ ЧЕТКОГО ОЧЕРТАНИЯ БЕЛЫХ СЕРДЕЧЕК
      }}>
        ♥ {/* ВСЕГДА ЗАПОЛНЕННОЕ СЕРДЕЧКО ДЛЯ ИСПРАВЛЕНИЯ "КВАДРАТИКОВ" */}
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
        paddingTop: '380px', // Отступ под часы iPhone
        fontFamily: 'sans-serif'
      }}>
        {/* СЕТКА: 15 в ряд, широкая */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '930px',
          marginBottom: '50px' 
        }}>
          {hearts}
        </div>

        {/* ФУТЕР (Текст внизу) */}
        <div style={{ 
          display: 'flex', 
          fontSize: '32px', 
          fontWeight: '600', 
          color: '#ad1457',
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
