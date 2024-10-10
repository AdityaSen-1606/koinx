const express = require('express')
const connectDB = require('./config/db')
const stats = require('./routes/stats.routes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use('/api/v1', stats)

app.listen(PORT,()=>{
    console.log(`Server is running over PORT ${PORT}`);
})