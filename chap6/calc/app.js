var https = require('https');
var fs = require('fs');
var connect = require('connect')

let options = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem')
};

function parse(req, res, next){
	let read = '';
	req.on('readable', () => {
		let data = req.read();
		if (data !== null){
			read += data;
		}
	});

	req.on('end', () => {
		let elements = read.split(' ');
		let numbers = elements.filter(x => !isNaN(x));
		let op = elements.filter(x => isNaN(x));
	});
}

let app = connect();
app.use(parse);

let server = https.createServer(options, app);
server.listen(3000);

console.log('server running at https://127.0.0.7:3000');
