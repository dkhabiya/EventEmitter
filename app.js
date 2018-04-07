var emitter = require('./emitter');

var func = function() {
    console.log("Test Function");
}

emitter.on('Test', func);