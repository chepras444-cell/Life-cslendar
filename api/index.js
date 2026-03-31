import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function () {
  const now = new Date();
  const year = now.getFullYear();
  const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const daysInYear = isLeap ? 366 : 365;
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const left = daysInYear - dayOfYear - 1;
  const percent = Math.floor((dayOfYear / daysInYear) * 100);

  // Генерируем сердечки как один большой блок текста
  let heartsHtml = '';
  for (let i = 0; i < daysInYear; i++) {
    const color = i < dayOfYear ? '#ef5350' : (i === dayOfYear ? '#ff1744' : '#ffcdd2');
    const symbol = i <= dayOfYear ? '♥' : '♡';
    heartsHtml += `<div style="color: ${color}; width: 22px; height: 22px; display: flex; font-size: 16px; justify-content: center;">${symbol}</div>`;
  }

  return new ImageResponse(
    `
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #ffebee; padding: 40px; font-family: sans-serif;">
      <div style="display: flex; flex-wrap: wrap; justify-content: center; width: 1000px; margin-bottom: 50px;">
        ${heartsHtml}
      </div>
      <div style="display: flex; font-size: 40px; font-weight: bold; color: #ad1457;">
        <span style="color: #ff1744; margin-right: 20px;">${left} дн. осталось</span>
        <span> • ${percent}% года</span>
      </div>
    </div>
    `,
    { width: 1170, height: 2532 }
  );
}
