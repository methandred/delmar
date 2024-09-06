// Функция для получения данных из API и обновления страницы
async function fetchAndUpdateRates() {
  try {
    // Получите данные от API функции
    const response = await fetch('/.netlify/functions/updateRates');
    
    // Проверьте, что запрос прошел успешно
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Преобразуйте ответ в JSON
    const data = await response.json();

    // Обновите элементы на странице
    document.getElementById('usdBuy').textContent = data.usdBuy || 'N/A';
    document.getElementById('usdSell').textContent = data.usdSell || 'N/A';
    document.getElementById('eurBuy').textContent = data.eurBuy || 'N/A';
    document.getElementById('eurSell').textContent = data.eurSell || 'N/A';
    document.getElementById('usdEur').textContent = data.usdEur || 'N/A';
    document.getElementById('eurUsd').textContent = data.eurUsd || 'N/A';
    document.getElementById('btcRate').textContent = data.btcRate || 'N/A';

  } catch (error) {
    console.error('Error fetching or updating rates:', error);
  }
}

// Вызовите функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchAndUpdateRates);
