'use strict';

function Emitter() {
    this.events = Object.create(null);
}

var emitterProto = Emitter.prototype;

emitterProto.on = function(event, handler) {
    console.log("Add event!");

    if(typeof this.events[event] !== 'object')
        this.events[event] = [];

    this.events[event].push(handler);
    return this;
}

// Export module
if(typeof module !== 'undefined') 
    module.exports = new Emitter();