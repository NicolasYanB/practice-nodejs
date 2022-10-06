var str = 'Hello Buffer World';
var buffer = new Buffer.from(str, 'utf-8');
var roundTrip = buffer.toString('utf-8');
console.log(roundTrip);
