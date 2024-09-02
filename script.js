document.addEventListener("DOMContentLoaded", function() {
    const ratesContainer = document.getElementById("rates-container");

    const rates = [
        { flag: "🇺🇸", name: "USD", value: "41,30 х 41,45" },
        { flag: "🇪🇺", name: "EUR", value: "45,70 х 45,85" },
        { flag: "🇺🇸🇪🇺", name: "USD/EUR", value: "1.110" },
        { flag: "🇪🇺🇺🇸", name: "EUR/USD", value: "1.103" },
        { flag: "🥇", name: "BTC", value: "57551 USDT" },
    ];

    rates.forEach(rate => {
        const rateCard = document.createElement("div");
        rateCard.className = "rate-card";

        const flagSpan = document.createElement("span");
        flagSpan.textContent = rate.flag + " " + rate.name;

        const valueSpan = document.createElement("span");
        valueSpan.textContent = rate.value;

        rateCard.appendChild(flagSpan);
        rateCard.appendChild(valueSpan);
        ratesContainer.appendChild(rateCard);
    });
});
