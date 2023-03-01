

const GreetingBot = require('./greeting-bot');

let conf_temp = {};

if (process.env.LP_KEY) {
    conf_temp = {
        accountId: process.env.LP_ACCOUNT,
        username: process.env.LP_USER,
        appKey: process.env.LP_KEY,
        secret: process.env.LP_SECRET,
        accessToken: process.env.LP_TOKEN,
        accessTokenSecret: process.env.LP_TOKEN_SECRET
    };
} else {
    conf_temp = {
        accountId: process.env.LP_ACCOUNT,
        username: process.env.LP_USER,
        password: process.env.LP_PASS
    };
}
const conf = Object.assign({}, conf_temp);

if (process.env.LP_CSDS) {
    conf.csdsDomain = process.env.LP_CSDS;
}

const bot = new GreetingBot(conf);
