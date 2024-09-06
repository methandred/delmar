let exchangeRates = {
  usdBuy: "41.30",
  usdSell: "41.45",
  eurBuy: "45.70",
  eurSell: "45.85",
  usdEur: "1.110",
  eurUsd: "1.103",
  btcRate: "57551"
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);

      // Валидация полученных данных
      const { usdBuy, usdSell, eurBuy, eurSell, usdEur, eurUsd, btcRate } = data;
      if (!usdBuy || !usdSell || !eurBuy || !eurSell || !usdEur || !eurUsd || !btcRate) {
        return {
          statusCode: 400,
          body: 'Invalid data format',
        };
      }

      // Сохранение данных
      exchangeRates = { usdBuy, usdSell, eurBuy, eurSell, usdEur, eurUsd, btcRate };

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
