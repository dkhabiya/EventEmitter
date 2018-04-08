'use strict';

// Emitter function - class.
function Emitter() {
    this.events = Object.create(null);
}

var emitterProto = Emitter.prototype;

// Add events/handlers
emitterProto.on = function(event, handler) {
    console.log("Add");
    if(!event) {
        throw new Error('Error: Event mandatory.');
    }

    if(this.eventType(event)) {
        throw new Error('Error: Event can be of type string only.');
    }

    if(!handler) {
        throw new Error('Error: Handler mandatory.');
    }

    if(this.handlerType(handler)) {
        throw new Error('Error: Handler can be of type function only.');
    }

    if(typeof this.events[event] !== 'object')
        this.events[event] = [];

    this.events[event].push(handler);

    console.log(this.events);
    return this;
}

// Remove events/handlers
emitterProto.off = function(event, handler) {
    console.log("Remove");
    // if no arguements are sent delete all events.
    if(arguments.length === 0) {
        delete this.events;
        console.log(this.events);
        return this;
    }
        
    if(event) {
        if(this.eventType(event)) {
            throw new Error('Error: Event can be of type string only.');
        }

        if(handler) {
            if(this.handlerType(handler)) {
                throw new Error('Error: Handler can be of type function only.');
            }

            // if both arguments are given delete only that handler of the event.
            this.events[event] = this.events[event].filter(function(h) {
                return h !== handler;
            });

        } else {
             // if only event is given remove all handlers associated with that event.
            this.events[event] = [];
        }
        // console.log(this.events);
        return this;
    }    
}

// Add an event/handler once
emitterProto.once = function(event, handler) {
    var self = this;

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
    console.log("Emit");
    var argList = [].slice.call(arguments, 1);
    var handlerList = this.events[event];
    
    if(handlerList) {
        handlerList.forEach(element => {
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
emitterProto.handlerType= function(handler) {
    return (typeof handler !== 'function');
}
// Export module
if(typeof module !== 'undefined') 
    module.exports = new Emitter();