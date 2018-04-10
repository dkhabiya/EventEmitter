## Event Emitter

A JavaScript event emitter.

### Install & Test
* Download repository.
* Run `npm install`.
* To test - `npm test`. 

### Implementation Details

This implememtation has the following methods.

* `on`
    **on(event, handler)**
        Adds an event along with a function or handler to be called when the event is fired. It takes the following parameters.

        | Parameter | Type     | Mandatory |
        |:----------|:---------|:----------|
        | event     | string   | Yes       |
        | handler   | function | Yes       |
        
        Usage example:
        
        ```js
        var Emitter = require('./src/emitter.js');
        var e = new Emitter();
        
        var handler = function() {
                console.log("Hello! This is an example.");
        }
        
        e.on('Event', handler);
        
        ```

* `off`
    **off(event, handler)**
        Removes events/handlers. It takes the following parameters 

        | Parameter | Type     | Mandatory |
        |:----------|:---------|:----------|
        | event     | string   | No        |
        | handler   | function | No        |
        
        Cases:
        * Removes all events and handlers when no parameters are sent.
        * Removes all handlers of the event, if only event is sent.
        * Removes handler mentioned for the event sent.
        
        Usage example:
        
        ```js
        var Emitter = require('./src/emitter.js');
        var e = new Emitter();
        
        var handler = function() {
                console.log("Hello! This is an example.");
        }
        
        e.on('Event', handler);
        e.off('Event', handler); //Removes handler of 'Event'
        e.off('Event'); //Removes all handlers of 'Event'
        e.off(); //Removes all events and handlers
        
        ```
        
* `once`
    **once(event, handler)**
        Adds an event along with a function or handler to be called when the event is fired. It takes the following parameters.

        | Parameter | Type     | Mandatory |
        |:----------|:---------|:----------|
        | event     | string   | Yes       |
        | handler   | function | Yes       |
        
        Usage example:
        
        ```js
        var Emitter = require('./src/emitter.js');
        var e = new Emitter();
        
        var handler = function() {
                console.log("Hello! This is an example.");
        }
        
        e.once('Event', handler);
        
        ```

* `emit`
    **emit(event, args)**
        Triggers all handlers for the event with the arguments sent. If no arguments are sent the handler is triggered without any parameters.

        | Parameter | Type     | Mandatory |
        |:----------|:---------|:----------|
        | event     | string   | Yes       |
        | args      | *        | No        |
        
        Usage example:
        
        ```js
        var Emitter = require('./src/emitter.js');
        var e = new Emitter();
        
        var handler = function() {
                console.log("Hello! This is an example.");
        }
        
        e.on('Event', handler);
        e.emit('Event');
        
        ```
        
