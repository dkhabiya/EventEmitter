var emitter = require('./emitter');

var func = function() {
    console.log("Test Function");
}

var func1 = function() {
    console.log("Test Function");
}
var func2 = function() {
    console.log("Test Function");
}
var func3 = function() {
    console.log("Test Function");
}

emitter.on('Test', func);
emitter.on('Test', func1);
emitter.on('Test2', func2);
emitter.on('Test2', func3);

// emitter.off('Test', func1);
// emitter.once('Test3', func1);
emitter.emit('Test',1,2,3);