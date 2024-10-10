const CryptoData = require("../models/cryptoData.models")

async function calculateStandardDeviation(values){
    const mean = values.reduce((a,b) => a+b,0)/values.length
    const squaredDiffs = values.map((value) => (value - mean) ** 2);
    const variance =
      squaredDiffs.reduce((a, b) => a + b, 0) / squaredDiffs.length;
    return Math.sqrt(variance);
}

async function getPriceDeviation(req,res){
    const {coin} = req.query

    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin specified.' });
    }

    try {
        const cryptoData = await CryptoData.find({ coin_id: coin })

        if (cryptoData.length === 0) {
            return res.status(500).json({ error: 'Internal Server Error No Coin Found' });
        }

        const prices = cryptoData[0].price_history

        if (prices.length === 0) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const deviation = calculateStandardDeviation(prices);

        return res.json({ deviation: parseFloat((await deviation).toFixed(2)) });
    } catch (error) {
        console.error('Error fetching price deviation:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = { getPriceDeviation };