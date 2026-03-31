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

  const hearts = [];
  for (let i = 0; i < daysInYear; i++) {
    const color = i < dayOfYear ? '#ef5350' : (i === dayOfYear ? '#ff1744' : '#ffcdd2');
    const symbol = i <= dayOfYear ? '♥' : '♡';
    hearts.push(
      `<div style="color: ${color}; width: 21px; height: 21px; display: flex; font-size: 16px; justify-content: center;">${symbol}</div>`
    );
  }

  return new ImageResponse(
    `
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; backgroundColor: #ffebee; padding-bottom: 100px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: center; width: 90%; margin-bottom: 30px;">
        ${hearts.join('')}
      </div>
      <div style="font-size: 24px; font-weight: bold; color: #ad1457; display: flex;">
        <span style="color: #ff1744; margin-right: 10px;">${left} дн. осталось</span>
        <span> • ${percent}% года</span>
      </div>
    </div>
    `,
    { width: 1170, height: 2532 }
  );
}
