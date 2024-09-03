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
        eurBuy: "42.72",
        eurSell: "45.87",
        usdEur: "1.112",
        eurUsd: "1.104",
        btcRate: "5555000"
    };
    
    // Call update function with new data
    updateRates(apiResponse);
}

// Fetch rates every 10 seconds (you can change this as needed)
setInterval(fetchRates, 10000);

// Initial fetch to populate the data immediately
fetchRates();

// Apply background styles when the DOM is fully loaded
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
            // Получаем цветовые данные для каждого пикселя по левому и правому краю
            const leftPixel = ctx.getImageData(0, y, 1, 1).data;
            const rightPixel = ctx.getImageData(img.width - 1, y, 1, 1).data;

            // Преобразуем данные в формат RGB
            leftColors.push(`rgb(${leftPixel[0]}, ${leftPixel[1]}, ${leftPixel[2]})`);
            rightColors.push(`rgb(${rightPixel[0]}, ${rightPixel[1]}, ${rightPixel[2]})`);
        }

        // Создаем плавный градиент на основе полученных данных
        const leftGradient = `linear-gradient(to right, ${leftColors.join(', ')})`;
        const rightGradient = `linear-gradient(to left, ${rightColors.join(', ')})`;

        // Устанавливаем фон для контейнера
        document.getElementById('container').style.background = `
           url('fon.png') center center no-repeat, ${leftGradient}, ${rightGradient}
        `;
        document.getElementById('container').style.backgroundSize = 'auto, contain, auto';
        document.getElementById('container').style.backgroundBlendMode = 'normal';
    };

    img.onerror = function () {
        console.log('Failed to load image');
    };
});
