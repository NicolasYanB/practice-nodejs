function Animal(name){
    this.name = name;
}

Animal.prototype.walk = function (destination){
    console.log(this.name, 'is walking to', destination);
}

// util function
var inherits = require('util').inherits;

// Bird child class
function Bird(name) {
    // Call parent constructor
    Animal.call(this, name);

    // Aditional construction code
}
inherits(Bird, Animal);

// Additional member functions
Bird.prototype.fly = function (destination) {
    console.log(this.name, 'is flying to', destination);
}

var bird = new Bird('sparrow');
bird.walk('sydney'); // sparrow is walking to sydney
bird.fly('melbourne'); // sparrow is flying to melbourne
