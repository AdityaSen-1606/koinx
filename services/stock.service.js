const fetch = require('node-fetch')
const cron = require('node-cron')
const CryptoData = require('../models/cryptoData.models')


async function fetchCryptoData () {
    const url = process.env.COIN_API;
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
        const response = await fetch (url, options);
        const data = await response.json()

        if(Array.isArray(data) && data.length > 0){
            const updatePromise = data.map((coin) =>
              updateCryptoData(
                coin.id,
                coin.current_price,
                coin.market_cap,
                coin.price_change_24h
              )
            );

            await Promise.all(updatePromise)
            console.log("All crypto data is updated successfully")
        } else {
            console.error("No Valid Data Fetched !")
        }

    } catch (error) {
        console.error("Error fetching Cypto Data", error);
    }
}

//function to create or update Crypto Data 
async function updateCryptoData(coinId, newPriceUsd, newMarketCapUsd, newChange24h){
    try {
        const cryptoData = await CryptoData.findOne({coin_id: coinId})

        if(cryptoData){
            cryptoData.price_history.push(newPriceUsd)

            while(cryptoData.price_history.length > 100){
                cryptoData.price_history.shift()
            }

            cryptoData.price_usd = newPriceUsd
            cryptoData.market_cap_usd = newMarketCapUsd
            cryptoData.change_24h = newChange24h

            await cryptoData.save()
            console.log(`Crypto Data is Saved ${coinId}`, cryptoData)
        } else {
            const newCryptoData = new CryptoData({
                coin_id : coinId,
                price_usd : newPriceUsd,
                market_cap_usd : newMarketCapUsd,
                change_24h : newChange24h,
                price_history : [newPriceUsd]
            })

            await newCryptoData.save()
            console.log(`NewCrypto Saved, `, newCryptoData)
        }
    } catch (error) {
        console.error(`Error updating crypto data for ${coinId}`, error)
    }
}

cron.schedule('0 */2 * * *', () => {
    console.log('fetching crypto data ....')
    fetchCryptoData()
})

module.exports = { fetchCryptoData };