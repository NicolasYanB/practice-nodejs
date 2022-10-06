function gerarSenha(){
    let senha = [];
    let counter = 0;
    while(counter<4){
        let num = gerarNumeroAleatorio();
        if (!senha.includes(num)){
            senha[counter] = num;
            counter++;
        }
    }
    return senha;
}

function gerarNumeroAleatorio(){
    let number = Math.floor(Math.random() * (9 - 0) + 0);
    return number;
}

const senhaObjetivo = gerarSenha();

function validar(req, res, next){
    let dados = '';
    req.on('readable', () => {
        let dado = req.read();
        if (dado !== null){
            dados += dado;
        }
    });
    req.on('end', () => {
        dados = dados.split(' ');
        let senha = dados.map(x => parseInt(x));
        let dadosJSON = {senha: senha};
        dadosJSON = JSON.stringify(dadosJSON);
        req.body = dadosJSON;
        next();
    });
}

function avaliar(req, res, next){
    let stts = [0, 0, 0, 0];
    let senha = JSON.parse(req.body).senha;
    for (let i = 0; i<senha.length; i++){
        let num = senha[i];
        if (senhaObjetivo.includes(num)){
            if (senhaObjetivo[i] === num){
                stts[i] = 1;
            } else {
                stts[i] = -1;
            }
        }
    }
    let sttsJSON = JSON.stringify({stts: stts});
    req.body = sttsJSON;
    next();
}

function enviar(req, res){
    let stts = JSON.parse(req.body).stts;
    let acertou = stts.every((element) => {
        return element === 1;
    });
    if (acertou){
        res.end("Parabens, você acertou a senha!\n");
        process.exit();
    }
    strStts = stts.toString().replaceAll(',', ' ') + '\n';
    res.end(strStts);
}

var connect = require('connect');

connect()
    .use(validar)
    .use(avaliar)
    .use(enviar)
    .listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
