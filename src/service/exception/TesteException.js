function TesteException(message){
    const error = new Error(message);
    return error;
}

TesteException.prototype = Object.create(Error.prototype);

module.exports = TesteException