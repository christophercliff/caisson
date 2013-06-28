var fs = require('fs'),
    caisson = require('../');

var AWS_PATH = './aws-config.json',
    FOLDER = './build';

var action = function (folder, options) {
    
    var awsConfigPath = options.awsConfig || AWS_PATH,
        folder = options.awsConfig || FOLDER,
        config;
    
    if (!fs.existsSync(awsConfigPath)) throw new Error('Could not find AWS config');
    
    try
    {
        config = JSON.parse(fs.readFileSync(awsConfigPath).toString());
    }
    catch (ex)
    {
        throw new Error('Could not parse AWS config');
    }
    
    caisson.push({
        build: folder,
        awsConfig: config
    }, function(err){
        console.log(err || 'push complete without errors');
        return process.kill();
    });
};

exports.action = action;