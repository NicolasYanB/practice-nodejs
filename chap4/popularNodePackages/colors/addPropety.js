String.prototype.__defineGetter__('red', function (str) {
    // Changes thr console foreground to red
    var redCode = '\x1b[31m';

    // Resets the console foreground
    var clearCode = '\x1b[39m';

    return redCode + this + clearCode;
});

console.log('Hello World!'.red);
