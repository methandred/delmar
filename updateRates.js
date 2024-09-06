exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

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

        // Здесь можно сохранять полученные данные в глобальные переменные
        // или обновить отображение данных на сайте через JavaScript (например, через localStorage или глобальный объект)

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
};
