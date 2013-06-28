var async = require('async'),
    AWS = require('aws-sdk'),
    _ = require('underscore'),
    bucket = require('./bucket'),
    dns = require('./dns'),
    cdn = require('./cdn');

var DEFAULT_OPTIONS = {
    s3: new AWS.s3(),
    route53: new AWS.Route53(),
    cloudFront: new AWS.CloudFront()
};

var initStorage = function (options, callback) {
    async.parallel([
        async.apply(bucket.create, options),
        async.apply(bucket.create, options)
    ], callback);
};

var initServices = function (options, callback) {
    async.parallel([
        async.apply(dns.create, options),
        async.apply(cdn.create, options)
    ], callback);
};

createManifest = function (options) {
    if (!_.isString(options.domain)) throw new Error('You must specify a domain');
    if (!_.isObject(options.awsConfig)) throw new Error('You must specify an AWS config');
    return _.chain({})
        .extend(options)
        .extend({})
        .defaults(DEFAULT_OPTIONS)
        .value();
};

var outputManifest = function (manifest, res) {
    return res;
};

var init = function (options, callback) {
    
    if (!_.isFunction(callback)) callback = function () {};
    
    var manifest;
    
    try
    {
        manifest = manifest.create(options);
        AWS.config.update(manifest.awsConfig);
    }
    catch (ex)
    {
        return callback(ex);
    }
    
    async.series([
        async.apply(initStorage, manifest),
        async.apply(initServices, manifest)
    ], function(err, res){
        if (err) return callback(new Error(err));
        callback(null, outputManifest(manifest, res));
    });

};

exports.action = init;