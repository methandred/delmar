const https = require('https');

const API_KEY = '$2a$10$ZFtFeEWyRLOasREJKNYfA.iQTosTAnOXLT9pp72YMA2rP7y5p0Rti'; // Укажите ваш API ключ JSONbin
const BIN_ID = '66e02158e41b4d34e42cf746'; // Укажите ID вашего bin
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`; // Исправлено: добавлен BIN_ID

// Функция для получения данных из JSONbin
const getRatesFromJSONbin = () => {
  return new Promise((resolve, reject) => {
    https.get(BASE_URL, {
      headers: {
        'X-Master-Key': API_KEY,
      }
    }, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.record);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Функция для обновления данных в JSONbin
const saveRatesToJSONbin = (data) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      }
    };

    const req = https.request(BASE_URL, options, (res) => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(responseData);
        } else {
          reject(new Error(`Status Code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    // Write data to request body
    req.write(JSON.stringify(data));
    req.end();
  });
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
  }   else if (event.httpMethod === 'GET') {
    try {
      const exchangeRates = await getRatesFromJSONbin();
      return {
        statusCode: 200,
        body: JSON.stringify(exchangeRates),
        headers: {
          "Content-Type": "application/json"
        }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server error',
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};
