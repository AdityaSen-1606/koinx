const CryptoData = require('../models/cryptoData.models')

async function getCryptoStats(req,res) {
    const {coin} = req.query

    //validating the coin
    if (!["bitcoin", "matic-network", "ethereum"].includes(coin)) {
      return res.status(400).json({ error: "Invalid coin specified." });
    }

    try {

        const cryptoData = await CryptoData.findOne({ coin_id: coin }); // Assuming createdAt is part of the schema

        if (!cryptoData) {
            return res.status(500).json({ error: 'Serve Error, Data not found for the specified coin' });
        }

        // Send response with the required fields
        return res.json({
            price: cryptoData.price_usd,
            marketCap: cryptoData.market_cap_usd,
            "24hChange": cryptoData.change_24h,
        });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = { getCryptoStats };