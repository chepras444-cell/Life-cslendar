import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const daysInYear = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 366 : 365;
  
  const left = daysInYear - dayOfYear - 1;
  const percent = Math.floor((dayOfYear / daysInYear) * 100);

  const hearts = [];
  for (let i = 0; i < daysInYear; i++) {
    let color = '#ffcdd2'; // Будущее: розовый контур
    let content = '♡';
    
    if (i < dayOfYear) {
      color = '#ef5350'; // Прошлое: красные закрашенные
      content = '♥';
    } else if (i === dayOfYear) {
      color = '#ff1744'; // Сегодня: яркий закрашенный
      content = '♥';
    }
    
    hearts.push(
      <div key={i} style={{
        color: color,
        fontSize: '14px',
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2px',
        marginBottom: '2px'
      }}>
        {content}
      </div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#ffebee', // Нежно-розовый фон
          paddingBottom: '80px',
        }}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '90%',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          {hearts}
        </div>
        
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#ad1457',
          display: 'flex',
        }}>
          <span style={{ color: '#ff1744', marginRight: '8px' }}>{left} дн. осталось</span>
          <span> • {percent}% года позади</span>
        </div>
      </div>
    ),
    {
      width: 430, // Размер под экран iPhone 15/16 Pro
      height: 932,
    },
  );
}
