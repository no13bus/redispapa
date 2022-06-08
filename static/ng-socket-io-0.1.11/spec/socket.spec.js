require("reflect-metadata");
require("es6-shim");

var enableDestroy = require('server-destroy');
var http = require('http');
var IOSocket = require("../socket-io.service.js").WrappedSocket;
var server, io;

beforeEach(function(){
  server = http.createServer();
  
  io = require('socket.io')(server);
  io.on('connection', function(socket){
      socket.emit('event',"someData");
      socket.emit('event',"someData");
      socket.on("otherEvent",function(){
        socket.emit('otherEvent',"Msg Received");
      });
      socket.emit('secondEvent',"someData");
      socket.emit('thirdEvent',"someDatasss");
  });
  server.listen(3000);
  enableDestroy(server);
  
});

afterEach(function(){
  server.destroy();
})



var ioClient = require('socket.io-client');

var socketURL = 'http://localhost:3000';

describe("fromEvent",function(){
  it('should be equal', (done) => {
    
    let socket = new IOSocket({url: socketURL});
    socket.fromEvent("event").subscribe((data)=>{
      expect(data).toEqual("someData"); 
      done();
    });
  
  }); 
})

describe("unsubcribe from Event",function(){
  it('should be equal', (done) => {
    var unsubcribeCallBack = jasmine.createSpy('unsubcribeCallBack');
    let socket = new IOSocket({url: socketURL});
    socket.fromEvent("thirdEvent").subscribe((data)=>{
      expect(data).toEqual("someData");
      socket.on("thirdEvent",unsubcribeCallBack);
    }).unsubscribe();
    
    setTimeout(function(){
      expect(unsubcribeCallBack).not.toHaveBeenCalled();
      done();
    },200);
    
  }); 
})

 


describe("on",function(){
  it('should be equal', (done) => {
    
    let socket = new IOSocket({url: socketURL});
    socket.on("event",(data) => {
      expect(data).toEqual("someData");
      done();
    });
  
  }); 
})


describe("once",function(){
  it('should be equal', (done) => {
    
    let socket = new IOSocket({url: socketURL});
    let count = 0;
    socket.once("event",(data) => {
      expect(data).toEqual("someData");
      count++;
    });
    
    setTimeout(function(){
      expect(count).toEqual(1);
      done();
    },200)
  }); 
})

describe("emit",function(){
  it('should be equal', (done) => {
    
    let socket = new IOSocket({url: socketURL});
    let count = 0;
    socket.emit('otherEvent');
    socket.on("otherEvent",function(data){
      expect(data).toEqual("Msg Received");
      done();
    });
  }); 
})


describe("should remove the listener",function(){
  it('should be equal', (done) => {
    var removeListenerCallBack = jasmine.createSpy('removeListenerCallBack');
    let socket = new IOSocket({url: socketURL});
    let count = 0;
    socket.on("event",removeListenerCallBack);
    socket.removeListener('event');
    setTimeout(function(){
      expect(removeListenerCallBack).not.toHaveBeenCalled();
      done();
    },200);
  }); 
})

describe("removeAllListeners",function(){
  it('should remove all listeners ', (done) => {
    var removeAllListenersCallBack = jasmine.createSpy('removeAllListenersCallBack');
    let socket = new IOSocket({url: socketURL});
    let count = 0;
    socket.on("event",removeAllListenersCallBack);
    socket.on("secondEvent",removeAllListenersCallBack);
    socket.removeAllListeners();
    
    setTimeout(function(){
      expect(removeAllListenersCallBack).not.toHaveBeenCalled();
      done();
    },200);
  }); 
})


describe("disconnect",function(){
  it('should disconnect', (done) => {
    var disconnectCallBack = jasmine.createSpy('disconnectCallBack');
    let socket = new IOSocket({url: socketURL});
    let count = 0;
    socket.disconnect();
    socket.on("event",disconnectCallBack);
    setTimeout(function(){
      expect(disconnectCallBack).not.toHaveBeenCalled();
      done();
    },200);
  }); 
})

