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

        // Берем цвет сверху и снизу изображения
        const topColorData = ctx.getImageData(0, 0, 1, 1).data;
        const bottomColorData = ctx.getImageData(0, img.height - 1, 1, 1).data;

        const topColor = `rgb(${topColorData[0]}, ${topColorData[1]}, ${topColorData[2]})`;
        const bottomColor = `rgb(${bottomColorData[0]}, ${bottomColorData[1]}, ${bottomColorData[2]})`;

        // Создаем градиент от верхнего цвета к нижнему
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

