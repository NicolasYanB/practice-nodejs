var foo = {
    a: 1,
    b: 'a string',
    c: true
};

//Convert javastring object to a string
var json = JSON.stringify(foo);
console.log(json);
console.log(typeof json); //String

//Convert JSON to a javascript object
var backToJs = JSON.parse(json);
console.log(backToJs);
console.log(typeof backToJs);
