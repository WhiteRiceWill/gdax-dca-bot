require('dotenv').config();
const Gdax = require('gdax');

// Assign the environmental variables to constants
const key = process.env.API_KEY;
const b64secret = process.env.API_SECRET;
const passphrase = process.env.API_PASSPHRASE;
const apiURI = process.env.SANDBOX_MODE === 'false' ? 'https://api.gdax.com' : 'https://api-public.sandbox.gdax.com';
const authedClient = new Gdax.AuthenticatedClient(key, b64secret, passphrase, apiURI);

const btcAmt = process.env.INTERVAL_INVESTMENT_AMOUNT_BTC;
const btcInterval = process.env.INVESTMENT_INTERVAL_BTC;

const ethAmt = process.env.INTERVAL_INVESTMENT_AMOUNT_ETH;
const ethInterval = process.env.INVESTMENT_INTERVAL_ETH;

const ltcAmt = process.env.INTERVAL_INVESTMENT_AMOUNT_LTC;
const ltcInterval = process.env.INVESTMENT_INTERVAL_LTC;

const sandboxMode = process.env.SANDBOX_MODE;
const fiatCurrency = process.env.FIAT_CURRENCY;

// Exports
module.exports = {
  authedClient,
  btcAmt,
  btcInterval,
  ethAmt,
  ethInterval,
  ltcAmt,
  ltcInterval,
  fiatCurrency,
  sandboxMode,
};

//  TODO
//  Readme
//  run a test of this for myself
