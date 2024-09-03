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

// Apply background styles when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const img = new Image();
    img.src = 'fon.png'; // Ensure this path is correct
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Create a blurred version of the image
        const blurredCanvas = document.createElement('canvas');
        const blurredCtx = blurredCanvas.getContext('2d');
        blurredCanvas.width = img.width;
        blurredCanvas.height = img.height;
        blurredCtx.drawImage(img, 0, 0);
        blurredCtx.filter = 'blur(30px)';
        blurredCtx.drawImage(img, 0, 0);

        // Set the background of the container
        document.getElementById('container').style.backgroundImage = `
            url(${canvas.toDataURL()}),
            url(${blurredCanvas.toDataURL()})
        `;
        document.getElementById('container').style.backgroundSize = 'cover, cover';
    };

    img.onerror = function () {
        console.log('Failed to load image');
    };
});
