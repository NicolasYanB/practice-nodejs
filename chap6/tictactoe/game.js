let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let filled = [];

let https = require('https');
let fs = require('fs');
let options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

function displayBoard(){
    let strBoard = ` -----------------\n|  ${board[0]}  |  ${board[1]}  |  ${board[2]}  |\n -----------------\n|  ${board[3]}  |  ${board[4]}  |  ${board[5]}  |\n -----------------\n|  ${board[6]}  |  ${board[7]}  |  ${board[8]}  |\n -----------------\n`;
    return strBoard;
}

function randomPosition(){
    let free_positions = [];
    for (let position of board){
        if (position === 'X' || position === 'O'){
            continue;
        }
        free_positions.push(position);
    }
    let index = Math.floor(Math.random()*free_positions.length);
    let position = free_positions[index];
    return position - 1;
}

function winner(symbol){
    let win_combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                            [1, 4, 7], [2, 5, 8], [3, 6, 9],
                            [1, 5, 9], [3, 5, 7]];
    for (const combination of win_combinations){
        let counter = 0;
        for (const position of combination){
            if (board[position-1] === symbol){
                counter++;
            }
        }
        if (counter === 3){
            return true;
        }
    }
    return false;
}

function draw(){
    if (board.every(element => element === 'X' || element === 'O')){
        return !winner('X') && !winner('O');
    }
}

let you = 0;
let machine = 0;

function choose(request, response){
    let readData = '';
    request.on('readable', () => {
        let data = request.read();
        if (data === null){
            if (readData === ''){
		    response.write("Choose a symbol ('X' or 'O')\n");
            } else {
                you = readData;
                machine = you === 'X' ? 'O' : 'X';
                response.write(displayBoard());
                response.write("Choose a position to play\n");
            }
            response.end();
        }
        readData += data;
    });
}

function play(request, response){
    let readData = '';
    request.on('readable', () => {
        let data = request.read();
        readData += data === null ? '' : data;
    });
    request.on('end', () => {
        let i = parseInt(readData);
        board[i-1] = you;
        if (winner(you)){response.end('You won!\n'); return;}
        machine_play = randomPosition();
        board[machine_play] = machine;
        if (winner(machine)){response.end('Machine won!\n'); return;}
        if (draw()){response.end('Draw!\n'); return;}
        response.write(displayBoard());
        response.write('Choose a position to play\n');
        response.end();
    });
}

function game(request, response){
    if (you === 0){
        choose(request, response);
    } else {
        play(request, response);
    }
}

let server = https.createServer(options, game);
server.listen(3000);

console.log('https://127.0.0.1:3000');
