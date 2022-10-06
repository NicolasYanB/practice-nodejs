var http = require('http');

function getRandomNumber(){
    let number = Math.floor(Math.random() * (100 - 1) + 1);
    return number;
}

function isRight(constant, guess){
    if (guess === constant){
        return 0;
    }
    if (guess > constant){
        return 1;
    }
    if (guess < constant){
        return -1;
    }
}

const goal = getRandomNumber();

function app (request, response){
    let number = '';
    request.on('readable', () => {
        let data = request.read()
        number += data !== null ? data : '';
    });
    request.on('end', () => {
        if (!isNaN(number)){
            number = parseInt(number);
            let stts = isRight(goal, number);
            if (stts === 0){
                response.end('You won! Congrats!');
                process.exit();
            }
            if (stts === 1){
                response.end('Too big! Try again!\n');
            }
            if (stts === -1){
                response.end('Too small! Try again!\n');
            }
        }
    });
}

var server = http.createServer(app);
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
