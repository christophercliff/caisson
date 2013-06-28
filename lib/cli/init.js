var fs = require('fs'),
    async = require('async'),
    _ = require('underscore'),
    caisson = require('../');

var AWS_PATH = './aws-config.json';

var action = function (domain, options) {
    
    var awsConfigPath = options.awsConfig || AWS_PATH;
    
    if (!fs.existsSync(awsConfigPath))
    {
        return async.series([
            async.apply(prompt, this, 'accessKeyId', 'AWS key: ', null),
            async.apply(prompt, this, 'secretAccessKey', 'AWS secret: ', null),
            async.apply(prompt, this, 'region', 'AWS region (us-east-1): ', 'us-east-1')
        ], function(err, res){
            var config = _.object(res);
            writeConfig(awsConfigPath, config);
            init(domain, config);
        });
    }
    
    return init(domain, readConfig(awsConfigPath));
};

var prompt = function (program, name, description, defaultValue, callback) {
    program.prompt(description, function(value){
        value = (value === '' && defaultValue) ? defaultValue : value;
        return callback(null, name, value);
    });
};

var readConfig = function (path) {
    return JSON.parse(fs.readFileSync(path).toString());
};

var writeConfig = function (path, config) {
    fs.writeFileSync(path, JSON.stringify(config, null, 2));
};

var init = function (domain, config) {
    caisson.init({
        domain: domain,
        awsConfig: config
    }, function(err){
        console.log(err || 'init complete without errors');
        return process.kill();
    });
};

exports.action = action;