const axios = require('axios');

const API_KEY = '$2a$10$ZFtFeEWyRLOasREJKNYfA.iQTosTAnOXLT9pp72YMA2rP7y5p0Rti'; // Укажите ваш API ключ JSONbin
const BIN_ID = '66e02158e41b4d34e42cf746'; // Укажите ID вашего bin
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Функция для получения данных из JSONbin
const getRatesFromJSONbin = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-Master-Key': API_KEY,
      }
    });
    return response.data.record;
  } catch (error) {
    console.error('Error fetching data from JSONbin:', error);
    return null;
  }
};

// Функция для обновления данных в JSONbin
const saveRatesToJSONbin = async (data) => {
  try {
    await axios.put(BASE_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      }
    });
  } catch (error) {
    console.error('Error saving data to JSONbin:', error);
  }
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      const { usdBuy, usdSell, eurBuy, eurSell, usdEur, eurUsd, btcRate } = data;

      if (!usdBuy || !usdSell || !eurBuy || !eurSell || !usdEur || !eurUsd || !btcRate) {
        return {
          statusCode: 400,
          body: 'Invalid data format',
        };
      }

      // Сохраняем полученные данные в JSONbin
      await saveRatesToJSONbin({ usdBuy, usdSell, eurBuy, eurSell, usdEur, eurUsd, btcRate });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data updated successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server error',
      };
    }
  } else if (event.httpMethod === 'GET') {
    const exchangeRates = await getRatesFromJSONbin();
    return {
      statusCode: 200,
      body: JSON.stringify(exchangeRates),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};
