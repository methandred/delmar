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
    img.src = 'fon.png'; // Убедитесь, что этот путь правильный
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 12); // Получаем палитру с 12 цветами

        // Используем 12 цветов для создания градиента
        const gradientColors = palette.map(color => `rgb(${color.join(',')})`);

        // Создаем градиент с множеством цветовых переходов
        const gradient = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;

        // Устанавливаем фон контейнера с изображением и градиентом
        document.getElementById('container').style.background = `
            ${gradient},
            url('fon.png') center center no-repeat
        `;
        document.getElementById('container').style.backgroundSize = 'auto, cover';
    };

    img.onerror = function() {
        console.log('Failed to load image');
    };
});

