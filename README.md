![GDAX DCA Bot Banner Image](/banner.png)

# Features
This bot provides a hands-off approach to cryptocurrency investing. It lets you set recurring buys for Bitcoin, Ethereum, and Litecoin at intervals ranging from every minute to once a day. The shorter the interval, the closer you can get to achieving a true dollar cost average.

The bot currently supports USD and EUR and trades on the US based exchange, [GDAX](https://www.gdax.com/). It places market orders that carry percentage based [fees](https://www.gdax.com/fees/BTC-USD) of 0.25% for BTC and 0.30% for ETH and LTC. Considering there are recurring buy services out there that tack on fees of 10%+, you could potentially save a lot of money.

If you’re just interested in playing around with the bot, it has a sandbox mode that uses fake money. You can read more about it below.

# Dollar Cost Averaging
[Dollar cost averaging](http://www.investopedia.com/terms/d/dollarcostaveraging.asp) is the strategy of buying a fixed dollar amount of an investment at a specific interval. It is thought to reduce risk, especially in volatile markets. Since cryptocurrency markets tend to be rather volatile it has become a pretty popular practice.

Dollar cost averaging is a slightly controversial topic, as there is an ongoing debate of whether or not it actually beats lump sum investing. There is strong math on both sides, however, I think its effectiveness ultimately boils down to the particular use case. I encourage you to read up on this if you're interested.

# Getting started
#### Set up GDAX/Coinbase account
Sign up for an account on GDAX if you haven’t already (a Coinbase account will also work), then deposit funds. Currently the best way to do this is with an ACH transfer (USD) or SEPA transfer (EUR) which are both free, otherwise, you’ll probably end up paying unnecessary fees.

#### Create API Key
Navigate to the API section of your dashboard and create an API key that with “Trade” permissions. This will generate a key, secret, and passphrase. You will need these later so write them down or store them safely.

#### Set up locally
Make sure you have [Node.js](https://nodejs.org) 8.0+ installed then run
```
git clone https://github.com/WhiteRiceWill/gdax-dca-bot.git
cd gdax-dca-bot
npm install
```

#### Configure bot
Create a .env file in your project’s root directory, then copy paste the code below into it.
```
#API Authentication
  API_KEY=
  API_SECRET=
  API_PASSPHRASE=

#Bitcoin
  INTERVAL_INVESTMENT_AMOUNT_BTC=
  INVESTMENT_INTERVAL_BTC=

#Ethereum
  INTERVAL_INVESTMENT_AMOUNT_ETH=
  INVESTMENT_INTERVAL_ETH=

#Litecoin
  INTERVAL_INVESTMENT_AMOUNT_LTC=
  INVESTMENT_INTERVAL_LTC=

#Other
  FIAT_CURRENCY=
  SANDBOX_MODE=
```
Fill out each section as specified. If you’re having trouble, you can take a look at the env.example file that shows what a filled out version looks like.

#### API Authentication
This is where to use the key, secret, and passphrase you generated earlier.
```
#API Authentication
  API_KEY=[your API key]
  API_SECRET=[your API secret]
  API_PASSPHRASE=[your API passphrase]
```

#### Currency Specific Settings
The interval investment amount is the amount in US Dollars or Euros that you want the bot to invest at each interval. The investment interval is how often you want the bot to buy.
```
#Bitcoin
  INTERVAL_INVESTMENT_AMOUNT_BTC=[amount in fiat]
  INVESTMENT_INTERVAL_BTC=[‘min’, ‘tenmins’, ‘hour’, ‘sixhours’, ‘day’]

#Ethereum
  INTERVAL_INVESTMENT_AMOUNT_ETH=[amount in fiat]
  INVESTMENT_INTERVAL_ETH=[‘min’, ‘tenmins’, ‘hour’, ‘sixhours’, ‘day’]

#Litecoin
  INTERVAL_INVESTMENT_AMOUNT_LTC=[amount in fiat]
  INVESTMENT_INTERVAL_LTC=[‘min’, ‘tenmins’, ‘hour’, ‘sixhours’, ‘day’]
```
For example, if you want to invest 1.50 cents into bitcoin every 10 minutes you would put
```
#Bitcoin
  INTERVAL_INVESTMENT_AMOUNT_BTC=1.50
  INVESTMENT_INTERVAL_BTC=tenmins
```
The bot is set to not buy if an amount of less than 1 dollar is entered as per the [GDAX trading rules](https://support.gdax.com/customer/portal/articles/2725970-trading-rules). So for example, if you wanted to invest in Bitcoin and Ethereum, but not Litecoin, for Litecoin you would put
```
#Litecoin
  INTERVAL_INVESTMENT_AMOUNT_LTC=0.00
  INVESTMENT_INTERVAL_LTC=day
```
In this case, it doesn’t matter what you put for the investment interval because the bot isn’t going to buy. Also, you can put fractions of a cent (example: 1.2534) and it should work.

#### Other
Set the currency you are using and whether or not the bot is in sandbox mode.
```
#Other
  FIAT_CURRENCY=[‘USD’, ‘EUR’]
  SANDBOX_MODE=[‘true’, ‘false’]
```

#### Test
To test that the bot is set up correctly turn it on (Caution: it will actually start buying). In the project’s root directory run
```
node bot.js
```
Then check your GDAX dashboard to make sure everything is working as expected. The bot uses your computer’s internal clock, so for example, if you have it set to makes buys hourly, it will buy at 1:00,2:00,3:00 etc… You should also note that the bot has a randomized, artificial delay of up to one minute on each buy. This is so that if this bot becomes popular, the exchange won’t be flooded with a large batch of market orders all at the same time.

The bot also offers a sandbox mode for those who want to try it out with fake money first. To use this feature create an API key in the [Sandbox GDAX](https://public.sandbox.gdax.com/) instead of the actual site. Then set SANDBOX_MODE in the .env file to true. This can also be helpful for debugging if you're having trouble getting it to work. While in sandbox mode the bot will print error messages to the console if something is wrong and a confirmation message every time a market order is successfully placed.

#### Deploy
If you’re planning on running the bot for a long period of time it makes sense to deploy to a server. To minimize latency I recommend using Amazon’s US East N. Virginia data center where GDAX’s primary servers are running as well. Plus an [EC2](https://aws.amazon.com/ec2/) t2.micro instance is free for the first year. Also, it's a good idea to install [PM2](https://github.com/Unitech/pm2), a production process manager for Node.js that will keep the bot up and running safely. Lastly, take precautions to not expose your .env file. Never commit it to a public repository for example.

# Strategies
The most common approach to dollar cost averaging cryptocurrencies is to do it over a long period of time (often years) and then hold your investment and wait. That isn’t the only option though. Because buys on GDAX incur a percentage based fee, and because this bot provides the option to set very short intervals, there is an opportunity for testing out new investment strategies. For example, if you wanted to, you could dollar cost average into a position over a 3 hour period. I have no idea whether or not that is a good idea, however, I do think there are some interesting experiments that could be done.

If your plan is more long-term, I recommend transferring your coins to a [hardware wallet](https://en.bitcoin.it/wiki/Hardware_wallet) every once in a while.

# Contributing
This bot is an experiment and contributions are welcome. If you have a suggestion or find a bug, either create an [issue](https://github.com/WhiteRiceWill/gdax-dca-bot/issues) or reach out to me on Twitter [@WhiteRiceWill](https://twitter.com/whitericewill)

# Disclaimer
Dollar cost averaging is not a sure-fire strategy, and this bot is experimental. Invest at your own risk.

# License
[MIT License](http://opensource.org/licenses/MIT)
