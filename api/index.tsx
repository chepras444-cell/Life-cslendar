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
    // ЦВЕТА И СТИЛИ
    const colorPast = '#ef5350';   // Прошлое - Насыщенный красный
    const colorToday = '#ff1744';  // Сегодня - Яркий красный
    const colorFutureContour = '#ffcdd2'; // Будущее - Бледный розовый контур

    let color = colorPast;
    let scale = '1';
    let textStroke = 'none'; // По умолчанию - без обводки

    if (i < dayOfYear) {
      color = colorPast; // past
    } else if (i === dayOfYear) {
      color = colorToday; // today
      scale = '1.4';
    } else {
      // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: ДЕЛАЕМ СЕРДЕЧКО КОНТУРНЫМ (пустым) ЧЕРЕЗ CSS
      color = 'transparent'; // Делаем само сердечко прозрачным
      // Добавляем тонкий контурный бордюр (text-stroke)
      // Мы используем стиль, который гарантированно работает на iOS (Webkit)
      textStroke = `1px ${colorFutureContour}`; 
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
        // Применяем Webkit text-stroke для контура
        WebkitTextStroke: textStroke, 
        textStroke: textStroke // На всякий случай для других браузеров
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
        backgroundColor: '#ffebee', // var(--bg) - Вернули светлый фон
        paddingTop: '380px', // Отступ под часы iPhone
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

        {/* ФУТЕР (Текст внизу) */}
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
