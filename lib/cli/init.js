var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    _ = require('underscore'),
    caisson = require('../');

var AWS_PATH = './aws-config.json',
    CAISSON_PATH = './caisson.json',
    DEFAULT_BUILD_PATH = path.resolve(__dirname, '../../assets/build_default');

var action = function (domain, options) {
    
    var awsConfigPath = options.awsConfig || AWS_PATH;
    
    async.waterfall([
        async.apply(getOrPromptAwsConfig, this, domain, awsConfigPath),
        async.apply(init, domain)
    ], function(err, awsConfig, caissonConfig){
        if (err) return logAndExit(err);
        writeConfig(CAISSON_PATH, caissonConfig);
        caisson.push({
            awsConfig: awsConfig,
            caissonConfig: caissonConfig,
            build: DEFAULT_BUILD_PATH
        }, function(err){
            return logAndExit(err || 'caisson init complete without errors');
        });
    });
};

var logAndExit = function (msg) {
    console.log(msg);
    return process.exit();
};

var getOrPromptAwsConfig = function (program, domain, path, callback) {
    
    if (fs.existsSync(path))
    {
        return callback(null, readConfig(path));
    }
    
    async.series([
        async.apply(prompt, program, 'accessKeyId', 'AWS key: ', null),
        async.apply(prompt, program, 'secretAccessKey', 'AWS secret: ', null),
        async.apply(prompt, program, 'region', 'AWS region (us-east-1): ', 'us-east-1')
    ], function(err, res){
        if (err) return callback(err);
        var config = _.object(res);
        writeConfig(path, config);
        return callback(null, config);
    });
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

var init = function (domain, awsConfig, callback) {
    caisson.init({
        domain: domain,
        awsConfig: awsConfig
    }, function(err, caissonConfig){
        if (err) return callback(err);
        return callback(null, awsConfig, caissonConfig);
    });
};

exports.action = action;