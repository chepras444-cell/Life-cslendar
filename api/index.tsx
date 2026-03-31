<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Life Calendar</title>
    <style>
        :root {
            --bg: #ffebee;
            --past: #ef5350;
            --future: #ffcdd2;
            --today: #ff1744;
            --text: #ad1457;
        }
        body, html { 
            margin: 0; padding: 0; width: 100%; height: 100%; 
            background: var(--bg); overflow: hidden;
            display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
            font-family: -apple-system, system-ui, sans-serif;
        }
        .container { width: 90%; text-align: center; padding-bottom: calc(90px + env(safe-area-inset-bottom)); }
        .grid { display: grid; grid-template-columns: repeat(15, 1fr); gap: 7px; margin-bottom: 30px; }
        .h { font-size: 16px; line-height: 1; display: flex; justify-content: center; }
        .past { color: var(--past); }
        .future { color: var(--future); }
        .today { color: var(--today); transform: scale(1.3); }
        .footer { font-size: 16px; font-weight: 600; color: var(--text); opacity: 0.8; }
        .footer b { color: var(--today); }
    </style>
</head>
<body>
    <div id="app" class="container">
        <div class="grid" id="g"></div>
        <div class="footer" id="s"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    
    <script>
        const now = new Date();
        const year = now.getFullYear();
        const start = new Date(year, 0, 1);
        const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const daysInYear = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 366 : 365;

        // Рисуем сетку
        const g = document.getElementById('g');
        let h = '';
        for (let i = 0; i < daysInYear; i++) {
            if (i < dayOfYear) h += '<div class="h past">♥</div>';
            else if (i === dayOfYear) h += '<div class="h today">♥</div>';
            else h += '<div class="h future">♡</div>';
        }
        g.innerHTML = h;

        const left = daysInYear - dayOfYear - 1;
        document.getElementById('s').innerHTML = `<b>${left} дн. осталось</b> • ${Math.floor((dayOfYear/daysInYear)*100)}% года`;

        // ГЛАВНАЯ ПРАВКА: Если есть ?height, превращаем страницу в картинку и ПЕРЕНАПРАВЛЯЕМ на неё
        if (window.location.search.includes('height')) {
            setTimeout(() => {
                html2canvas(document.body, { backgroundColor: '#ffebee', scale: 3 }).then(canvas => {
                    const dataUrl = canvas.toDataURL('image/png');
                    // Редирект на саму картинку. Это заставит Команды iOS увидеть ФАЙЛ.
                    window.location.replace(dataUrl);
                });
            }, 100); // Мини-пауза для отрисовки
        }
    </script>
</body>
</html>
