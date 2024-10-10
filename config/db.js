const mongoose = require('mongoose');
const { fetchCryptoData } = require('../services/stock.service');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(()=>(console.log("Connected to MongoDB !")))
        .then(() => console.log('Fetching the Crypto Data', fetchCryptoData()))
        .catch((err)=>console.error(`Mongo DB Connection error: ${err}`));
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB