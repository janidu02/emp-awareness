const moment = require("moment");

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    next();
    const ms = Date.now() - start;
    const logText = `[${moment().format("DD/MMM/YYYY")} ${moment().format("HH:mm:ss")}] "${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode}  ${ms}ms`;
    //   console.log(logText.green);
    res.statusCode === 200 ? console.log(logText.green) : console.log(logText.red);
};

module.exports = loggerMiddleware;
