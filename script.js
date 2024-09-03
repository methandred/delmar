// script.js

// Function to update currency rates
function updateRates(data) {
    document.getElementById('usd-buy').innerText = data.usdBuy;
    document.getElementById('usd-sell').innerText = data.usdSell;
    document.getElementById('eur-buy').innerText = data.eurBuy;
    document.getElementById('eur-sell').innerText = data.eurSell;
    document.getElementById('usd-eur').innerText = data.usdEur;
    document.getElementById('eur-usd').innerText = data.eurUsd;
    document.getElementById('btc-rate').innerText = data.btcRate;
}

// Example function to simulate API call
function fetchRates() {
    // Simulated API response
    const apiResponse = {
        usdBuy: "41.32",
        usdSell: "41.47",
        eurBuy: "45.72",
        eurSell: "45.87",
        usdEur: "1.112",
        eurUsd: "1.104",
        btcRate: "59000"
    };
    
    // Call update function with new data
    updateRates(apiResponse);
}

// Fetch rates every 10 seconds (you can change this as needed)
setInterval(fetchRates, 10000);

// Initial fetch to populate the data immediately
fetchRates();

document.addEventListener('DOMContentLoaded', function () {
    const img = new Image();
    img.src = 'fon.png'; // Путь к вашему изображению
    img.crossOrigin = 'Anonymous'; 

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Функция для получения среднего цвета области изображения
        function getAverageColor(y, height) {
            const imageData = ctx.getImageData(0, y, img.width, height).data;
            let r = 0, g = 0, b = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
            }

            r = Math.floor(r / (imageData.length / 4));
            g = Math.floor(g / (imageData.length / 4));
            b = Math.floor(b / (imageData.length / 4));

            return `rgb(${r}, ${g}, ${b})`;
        }

        // Получаем цвета с верхней и нижней части изображения
        const topColor = getAverageColor(0, 10); // Верхняя часть
        const bottomColor = getAverageColor(img.height - 10, 10); // Нижняя часть

        // Создаем плавный градиент
        const gradient = `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;

        // Устанавливаем фон контейнера с изображением и градиентом
        document.getElementById('container').style.background = `
            url('fon.png') center center no-repeat,
            ${gradient}
        `;
        document.getElementById('container').style.backgroundSize = 'auto, contain';
    };

    img.onerror = function() {
        console.log('Failed to load image');
    };
});


