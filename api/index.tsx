import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function () {
  const now = new Date();
  const year = now.getFullYear();
  const daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const left = daysInYear - dayOfYear - 1;

  const hearts = [];
  for (let i = 0; i < daysInYear; i++) {
    let color = '#ffcdd2';
    if (i < dayOfYear) color = '#ef5350';
    else if (i === dayOfYear) color = '#ff1744';
    
    hearts.push(
      <div key={i} style={{
        color: color,
        width: '21px',
        height: '21px',
        display: 'flex',
        fontSize: '16px',
        justifyContent: 'center'
      }}>{i <= dayOfYear ? '♥' : '♡'}</div>
    );
  }

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#ffebee',
        paddingBottom: '100px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '90%', marginBottom: '30px' }}>
          {hearts}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ad1457', display: 'flex' }}>
          <span style={{ color: '#ff1744', marginRight: '10px' }}>{left} дн. осталось</span>
          <span> • {Math.floor((dayOfYear / daysInYear) * 100)}% года</span>
        </div>
      </div>
    ),
    { width: 1170, height: 2532 }
  );
}
