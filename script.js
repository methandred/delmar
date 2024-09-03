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
    img.crossOrigin = 'Anonymous'; // Позволяет загружать изображения с других доменов

    img.onload = function () {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img); // Получаем доминирующий цвет
        const palette = colorThief.getPalette(img, 2); // Получаем палитру дополнительных цветов

        // Создаем градиент на основе полученных цветов
        const color1 = `rgb(${dominantColor.join(',')})`;
        const color2 = `rgb(${palette[1].join(',')})`;

        // Устанавливаем фон контейнера с изображением и градиентом
        document.getElementById('container').style.background = `
            linear-gradient(to bottom, ${color1}, ${color2}),
            url('fon.png') center center no-repeat
        `;
        document.getElementById('container').style.backgroundSize = 'auto, cover';
    };
});
