try{
    setTimeout(function () {
        console.log('about to throw an error');
        throw new Error('Error thrown');
    }, 1000);
}
catch(e){
    console.log('i will never execute!');
}

console.log('im outside the try block');
