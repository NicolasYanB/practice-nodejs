var connect = require('connect');

connect()
    .use(function (req, res, next){next();})
    .use(function (err, req, res, next){res.end('Error occured!');})
    .use(function (req, res, next){throw new Error();})
    .listen(3000);
