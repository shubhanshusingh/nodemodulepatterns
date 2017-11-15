const EventEmitter = require('events').EventEmitter;
const eeInstance = new EventEmitter();

function tryEmitter(){

}

tryEmitter.prototype.log = function(msg){

    eeInstance.emit('logged',msg);

}

tryEmitter.prototype.getEmitter = function () {

    return eeInstance;
}


module.exports  = tryEmitter