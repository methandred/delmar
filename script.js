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
    img.src = 'fon.png'; // Убедитесь, что путь к вашему изображению правильный
    img.crossOrigin = 'Anonymous'; 

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const sections = 10; // Разбиваем изображение на 10 секций по высоте для анализа цветов
        const gradientColors = [];

        for (let i = 0; i < sections; i++) {
            const sectionHeight = img.height / sections;
            const yPosition = i * sectionHeight;
            const imageData = ctx.getImageData(0, yPosition, img.width, sectionHeight).data;

            let r = 0, g = 0, b = 0;
            const pixelCount = imageData.length / 4;

            for (let j = 0; j < imageData.length; j += 4) {
                r += imageData[j];
                g += imageData[j + 1];
                b += imageData[j + 2];
            }

            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);

            gradientColors.push(`rgb(${r}, ${g}, ${b})`);
        }

        // Создаем градиент на основе цветов из всех секций
        const gradient = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;

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


