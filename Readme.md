
# Cypto Tracker API

This project is done as takeaway Challenge by KoinX. Project is design to fetch and store real data about cryptocurrency using CoinGecko API.


## Overview of Data Modelling

- MongoDB Database is used to store the data after fetching from CoinGecko.

- Node Cron is used to schedule the fetching in very 2 hours and store pricing in price history.

- Schema with backend validation is as follows

| Keys             | Properties                                                                |
| ----------------- | ------------------------------------------------------------------ |
| coin_id | coin name, string type, required field |
| price_usd | coin usd price, number type, required field |
| market_cap_usd | coin market cap usd, number type, required field |
| change_24h | coin price change in 24 hour, number type, required field |
| price_history | coin past 100 prices array, array type, with every updation previous price append in array |
| time_stamps | schema time stamps, created at & updated at |

## Routes

Deviation route helps to get deviation in pricing array for received coin in params: 

```bash
GET http://localhost:3000/api/v1/deviation?coin=bitcoin
```
- Query Params
```javascript
{
	coin: `bitcoin` // Could be one of the above 3 coins
}
```
- Samle Response
```javascript
{
	deviation: 4082.48
}
```

Stats Route helps to get latest data of requested cryptocurrency:
```bash
GET http://localhost:3000/api/v1/stats?coin=bitcoin
```
* Query Params
```javascript
{
	coin: `bitcoin` // Could be one of the above 3 coins
}
```
* Sample Response
```javascript
{
	price: 40000,
	marketCap: 800000000,
	"24hChange": 3.4
}
```


## Deployment

To deploy this project clone this github repo

```bash
  node index.js
```
OR

Use below link as deployment and use it as prefix for following routes:
```bash
https://koinx-49ac.onrender.com
```
```
Stats GET https://koinx-49ac.onrender.com/api/v1/stats?coin=bitcoin
Deviation GET https://koinx-49ac.onrender.com/api/v1/deviation?coin=bitcoin
```

