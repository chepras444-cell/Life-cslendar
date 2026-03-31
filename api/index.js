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

  // Создаем строку с сердечками заранее
  const heartsArray = Array.from({ length: daysInYear }, (_, i) => {
    const color = i < dayOfYear ? '#ef5350' : (i === dayOfYear ? '#ff1744' : '#ffcdd2');
    const symbol = i <= dayOfYear ? '♥' : '♡';
    return (
      <div key={i} style={{ color: color, width: '22px', height: '22px', display: 'flex', fontSize: '16px', justifyContent: 'center' }}>
        {symbol}
      </div>
    );
  });

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffebee', padding: '40px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '1000px', marginBottom: '50px' }}>
          {heartsArray}
        </div>
        <div style={{ display: 'flex', fontSize: '40px', fontWeight: 'bold', color: '#ad1457' }}>
          <span style={{ color: '#ff1744', marginRight: '20px' }}>{left} дн. осталось</span>
          <span> • {percent}% года</span>
        </div>
      </div>
    ),
    { width: 1170, height: 2532 }
  );
}
