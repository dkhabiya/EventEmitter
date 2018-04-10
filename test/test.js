'use strict';

var chai    =  require('chai'),
    expect  = chai.expect;
    
var Emitter = require('../src/emitter.js');

describe('Emitter', function() {
    // Emitter object
    var emitter;
    
    // Event names
    const EVENT_A   = 'eventA';
    const EVENT_B   = 'eventB';
    const EVENT_B_L = 'eventb';
    const EVENT_C   = 'eventC';
    
    // Dummy functions
    var dummyFunction1;
    var dummyFunction2;
    var dummyFunction3;
    var dummyFunction4;
    
    var called;
    
    // Before each test case is executed this function is run.
    beforeEach(function () {
        emitter = new Emitter();
        
        called = [];
        
        dummyFunction1 = function() { called.push('dummyFunction1'); };
        dummyFunction2 = function() { called.push('dummyFunction2'); };
        dummyFunction3 = function() { called.push('dummyFunction3'); };
        dummyFunction4 = function() {
            var sum = 0;
            if(arguments.length > 0) {
                var arr = Array.prototype.slice.call(arguments);
                sum = arr.reduce(function(accumulator, currentValue){
                   return accumulator + currentValue; 
                });
            }
            
            called.push(sum); 
        };
    });
    
    describe('on(event, handler)', function () {
        
        it('should add the event and handler', function () {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
            
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction1, dummyFunction2]);
        });
        
        it('should not add handler if it exists for the event', function () {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction1);
            
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction1]);
        });
    
        it('should throw an error if input event parameter is not sent', function() {
            expect(emitter.on.bind()).to.throw(Error);
        });
        
        it('should throw an error if a non-string data type is as the event', function() {
            expect(emitter.on.bind(123, dummyFunction3)).to.throw(TypeError);
        });

        it('should throw an error if input handler parameter is not sent', function() {
            expect(emitter.on.bind(EVENT_B)).to.throw(Error);
        });
        
        it('should throw an error if a non-function data type is sent as the handler', function() {
            expect(emitter.on.bind(EVENT_A, 123)).to.throw(TypeError);
        });
    });
    
    describe('off(event, handler)', function() {
        it('should remove the handler from the event', () => {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
            
            expect(emitter.events[EVENT_A].length).to.eql(2);
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction1, dummyFunction2]);

            emitter.off(EVENT_A, dummyFunction1);
            
            expect(emitter.events[EVENT_A].length).to.eql(1);
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction2]);
        });
        
        it('should unsubscribe all handlers when no handler is provided', () => {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
            
            expect(emitter.events[EVENT_A].length).to.eql(2);
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction1, dummyFunction2]);

            emitter.off(EVENT_A);
            
            expect(emitter.events[EVENT_A].length).to.eql(0);
            expect(emitter.events[EVENT_A]).to.eql([]);
        });
        
        
        it('should remove all events/handlers if no parameters are sent', () => {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_B, dummyFunction2);
            emitter.on(EVENT_C, dummyFunction3);
            emitter.on(EVENT_B_L, dummyFunction4);
            
            var length = Object.keys(emitter.events).length;
            expect(length).to.eql(4);
            
            emitter.off();
            
            expect(typeof emitter.events).to.eql('undefined');
        });

        it('should throw an error if a non-string data type is sent as the event', function() {
             expect(emitter.off.bind(123, dummyFunction3)).to.throw(TypeError);
        });
        
        it('should throw an error if a non-function data type is sent as the handler', function() {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
        
            expect(emitter.off.bind(EVENT_A, 'foo')).to.throw(TypeError);
        });
        
    });
    
    describe('once(event, handler)', function(){
        it('should add an event with handler and emit it once', function() {
            emitter.once(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
        
            // Executes both handlers. Removes the handler added using once
            emitter.emit(EVENT_A);
            
            expect(emitter.events[EVENT_A]).to.eql([dummyFunction2]);
            expect(called).to.eql(['dummyFunction1', 'dummyFunction2']);
        });
        
        it('should add an event with handler once and emit it with arguments', function() {
            emitter.once(EVENT_A, dummyFunction1);
            emitter.once(EVENT_A, dummyFunction3);
            emitter.once(EVENT_A, dummyFunction4);
            
            emitter.emit(EVENT_A, 'Hello', '!!');
            
            expect(emitter.events[EVENT_A]).to.eql([]);
            expect(called).to.eql(['dummyFunction1', 'dummyFunction3', 'Hello!!']);
        });
        
        it('should throw an error if input event parameter is not sent', function() {
            expect(emitter.once.bind()).to.throw(Error);
        });
        
        it('should throw an error if a non-string data type is as the event', function() {
            expect(emitter.once.bind(123, dummyFunction3)).to.throw(TypeError);
        });

        it('should throw an error if input handler parameter is not sent', function() {
            expect(emitter.once.bind(EVENT_B)).to.throw(Error);
        });
        
        it('should throw an error if a non-function data type is sent as the handler', function() {
            expect(emitter.once.bind(EVENT_A, 123)).to.throw(TypeError);
        });
    });
    
    describe('emit(event, args)', function() {
        it('should call all handlers for the event', function() {
            emitter.on(EVENT_A, dummyFunction1);
            emitter.on(EVENT_A, dummyFunction2);
            emitter.on(EVENT_A, dummyFunction3);
            
            emitter.emit(EVENT_A);
            
            expect(called).to.eql(['dummyFunction1', 'dummyFunction2', 'dummyFunction3']);
            
        });
        
        it('should call all handlers for the event with arguments', function() {
            emitter.on(EVENT_B, dummyFunction1);
            emitter.on(EVENT_B, dummyFunction4);
            
            emitter.emit(EVENT_B, 1, 2, 3);
            
            expect(called).to.eql(['dummyFunction1', 6]);
            
        });
        
        it('should match event names', () => {
            emitter.on(EVENT_B, dummyFunction1);
            emitter.emit(EVENT_B);
            emitter.emit(EVENT_B_L);
            emitter.emit(EVENT_B);

            expect(called.length).to.eql(2);
            
        });
        
        it('should throw an error if input event parameter is not sent', function() {
            expect(emitter.emit.bind()).to.throw(Error);
        });
        
        it('should throw an error if a non-string data type is as the event', function() {
          expect(emitter.emit.bind(123, 123)).to.throw(TypeError);
        });
    
    });
    
});