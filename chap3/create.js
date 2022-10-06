var fs = require('fs');
fs.writeFileSync('test.txt', 'Hello fs!');
console.log(fs.readFileSync('test.txt'));
