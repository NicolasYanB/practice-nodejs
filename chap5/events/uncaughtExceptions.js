process.on('uncaughtException', function (err){
    console.log('Caught exception:', err);
    console.log('Stack:', err.stack);
    process.exit(1);
});

// Intentionally cause an exception, but don't try/catch it.
nonexistentFunc();

console.log('This will not run.');
