function longRunningOperation(callback){
    setTimeout(callback, 3000);
}

function webRequest(request){
    console.log('start a long operation for request:', request.id);
    longRunningOperation(function (){
        console.log('ending a long running operation for request:',  request.id);
    });
}

webRequest({id: 1});
webRequest({id: 2});
