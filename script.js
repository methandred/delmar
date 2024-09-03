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

        const leftColors = [];
        const rightColors = [];

        for (let y = 0; y < img.height; y++) {
            const leftPixel = ctx.getImageData(0, y, 1, 1).data;
            const rightPixel = ctx.getImageData(img.width - 1, y, 1, 1).data;

            leftColors.push(`rgb(${leftPixel[0]}, ${leftPixel[1]}, ${leftPixel[2]})`);
            rightColors.push(`rgb(${rightPixel[0]}, ${rightPixel[1]}, ${rightPixel[2]})`);
        }

        // Создаем градиент, который продлевает цвета с левого и правого краев
        const leftGradient = leftColors.join(', ');
        const rightGradient = rightColors.join(', ');

        document.getElementById('container').style.background = `
        url('fon.png') center center no-repeat,
            linear-gradient(to right, ${leftGradient}),
            linear-gradient(to left, ${rightGradient})
        `;
        document.getElementById('container').style.backgroundSize = 'auto, contain';
        document.getElementById('container').style.backgroundBlendMode = 'normal';
    };

    img.onerror = function() {
        console.log('Failed to load image');
    };
});

