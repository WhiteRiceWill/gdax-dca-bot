const {
  authedClient,
  btcAmt,
  btcInterval,
  ethAmt,
  ethInterval,
  ltcAmt,
  ltcInterval,
  fiatCurrency,
  sandboxMode,
} = require('./constants.js');
const schedule = require('node-schedule');

// Place a market order for the interval investment amount
const buy = (coinSymbol, amt) => {
  const buyParams = {
    type: 'market',
    funds: amt,
    size: null,
    product_id: `${coinSymbol}-${fiatCurrency}`,
  };
  authedClient.buy(buyParams, (error, response, data) => {
    if (sandboxMode) {
      console.log(data);
    }
  });
};

// Convert text based intervals to raw intervals
const rawInterval = interval =>
    interval === 'min' ? '0-59/1 * * * *'
  : interval === 'tenmins' ? '0-59/10 * * * *'
  : interval === 'hour' ? '0 0-23/1 * * *'
  : interval === 'sixhours' ? '0 0-23/6 * * *'
  : interval === 'day' ? '0 0 1-31/1 * *'
  : console.log('Scheduling failed: Invalid investment interval (check your .env file to make sure the investment intervals are correct)')


// Schedule buys and tack on a randomized, artificial delay lasting up to 1 minute
const coinOn = (coinSymbol, amt, interval) => {
  schedule.scheduleJob(rawInterval(interval), () => {
    const randomDelay = Math.floor(Math.random() * 60) + 1;
    setTimeout(() => {
      buy(coinSymbol, amt);
    }, randomDelay * 1000);
  });
};

// Turn coins on if their interval investment amounts meet the GDAX trade rules minimum
const botOn = () => {
  if (btcAmt >= 10.00) {
    coinOn('BTC', btcAmt, btcInterval);
  }
  if (ethAmt >= 10.00) {
    coinOn('ETH', ethAmt, ethInterval);
  }
  if (ltcAmt >= 10.00) {
    coinOn('LTC', ltcAmt, ltcInterval);
  }
};

// Export
module.exports = botOn;
