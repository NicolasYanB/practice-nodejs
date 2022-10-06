var foo = {a: 1};
var bar = Object.create(foo);
console.log(bar.__proto__ === foo); // true
