'use strict';

// Emitter function - class.
function Emitter() {
    //Object to hold events/handlers
    this.events = Object.create(null);
}

//Emitter object prototype
var emitterProto = Emitter.prototype;

// Add events/handlers
emitterProto.on = function(event, handler) {
    
    if(!event) {
        throw new Error('Event mandatory.');
    }

    if(this.eventType(event)) {
        throw new TypeError('Event can be of type string only.');
    }

    if(!handler) {
        throw new Error('Handler mandatory.');
    }

    if(this.handlerType(handler)) {
        throw new TypeError('Handler can be of type function only.');
    }

    if(!this.eventExists(event))
        this.events[event] = [];

    // Do not add handler to event if it already exists 
    if (this.events[event].indexOf(handler) === -1) {
        this.events[event].push(handler);   
    }

    return this;
}

// Remove events/handlers
emitterProto.off = function(event, handler) {
    
    // if no arguements are sent delete all events.
    if(arguments.length === 0) {
        delete this.events;
        return this;
    }
        
    if(event) {
        if(this.eventType(event)) {
            throw new TypeError('Event can be of type string only.');
        }
        
        if(this.eventExists(event)) {
            if(handler) {
                if(this.handlerType(handler)) {
                    throw new TypeError('Handler can be of type function only.');
                }
    
                // if both arguments are given delete only that handler of the event.
                this.events[event] = this.events[event].filter(function(h) {
                    return h !== handler;
                });
    
            } else {
                 // if only event is given remove all handlers associated with that event.
                this.events[event] = [];
            }
        }
    }    
    
    return this;
}

// Add an event/handler once
emitterProto.once = function(event, handler) {
    var self = this;

    if(!event) {
        throw new Error('Event mandatory.');
    }

    if(this.eventType(event)) {
        throw new TypeError('Event can be of type string only.');
    }

    if(!handler) {
        throw new Error('Handler mandatory.');
    }

    if(this.handlerType(handler)) {
        throw new TypeError('Handler can be of type function only.');
    }

    function newHandler() {
        self.off(event, newHandler);
        handler.apply(this, arguments);
    }

    handler._newHandler = newHandler;
    this.on(event, newHandler);

    return this;
}

// Emit and event/handler
emitterProto.emit = function(event) {
    
    if(!event) {
        throw new Error('Event mandatory.');
    }

    if(this.eventType(event)) {
        throw new TypeError('Event can be of type string only.');
    }
    
    var argList = [].slice.call(arguments, 1);
    var handlerList = this.events[event];
    
    if(handlerList) {
        handlerList.forEach(function(element) {
            element.apply(this, argList);
        });
    }

    return this;
}

// Check if event is of type string
emitterProto.eventType = function(evt) {
    return (typeof evt !== 'string');
}

// Check if handler is of type function.
emitterProto.handlerType = function(handler) {
    return (typeof handler !== 'function');
}

emitterProto.eventExists = function(evt) {
     return (typeof this.events[evt] === 'object');
}

// Export module
if(typeof module !== 'undefined') 
    module.exports = Emitter;