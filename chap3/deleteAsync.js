var fs = require('fs');
fs.writeFileSync('test.txt', 'Hello fs!');
console.log(fs.readFile('test.txt', function(err){
    if (err){
        console.log('Error:', err);
    }else{
        console.log('File load complete');
    }
}).toString());
console.log('Loading file...');
