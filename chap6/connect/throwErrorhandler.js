var connect = require('connect');

connect()
    .use(function () {throw new Error('Bid bad error details');})
    .use(function (req, res, next){res.end('I will never get called');})
    .use(function (err, req, res, next){
        consoole.log('Error handled:', err.message);
        res.writeHead(500);
        res.end('Server error!');
    })
    .listen(3000);
