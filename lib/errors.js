var util = require('util');

var BucketError = function (message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};

util.inherits(BucketError, Error);

exports.BucketError = BucketError;