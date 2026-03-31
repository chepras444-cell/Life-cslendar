import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function () {
  const now = new Date();
  const year = now.getFullYear();
  const daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const left = daysInYear - dayOfYear - 1;
  const percent = Math.floor((dayOfYear / daysInYear) * 100);

  // Генерируем массив сердечек
  const hearts = Array.from({ length: daysInYear }, (_, i) => {
    const color = i < dayOfYear ? '#ef5350' : (i === dayOfYear ? '#ff1744' : '#ffcdd2');
    const symbol = i <= dayOfYear ? '♥' : '♡';
    return (
      <div key={i} style={{ 
        color, 
        width: '21px', 
        height: '21px', 
        display: 'flex', 
        fontSize: '16px', 
        justifyContent: 'center' 
      }}>
        {symbol}
      </div>
    );
  });

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
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          width: '950px' 
        }}>
          {hearts}
        </div>
        <div style={{ 
          display: 'flex', 
          fontSize: '40px', 
          fontWeight: 'bold', 
          color: '#ad1457', 
          marginTop: '40px' 
        }}>
          <span style={{ color: '#ff1744', marginRight: '20px' }}>{left} дн. осталось</span>
          <span>• {percent}% года</span>
        </div>
      </div>
    ),
    { width: 1170, height: 2532 }
  );
}
