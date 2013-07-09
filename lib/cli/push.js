var fs = require('fs'),
    caisson = require('../');

var AWS_PATH = './aws-config.json',
    CAISSON_PATH = './caisson.json',
    FOLDER = './build';

var action = function (folder, options) {
    
    var awsConfigPath = options.awsConfig || AWS_PATH,
        folder = folder || FOLDER,
        awsConfig,
        caissonConfig;
    
    if (!fs.existsSync(CAISSON_PATH)) throw new Error('Could not find Caisson config');
    if (!fs.existsSync(awsConfigPath)) throw new Error('Could not find AWS config');
    
    try
    {
        caissonConfig = JSON.parse(fs.readFileSync(CAISSON_PATH).toString());
        awsConfig = JSON.parse(fs.readFileSync(awsConfigPath).toString());
    }
    catch (ex)
    {
        throw new Error(ex);
    }
    
    caisson.push({
        build: folder,
        caissonConfig: caissonConfig,
        awsConfig: awsConfig
    }, function(err){
        console.log(err || 'caisson push complete without errors');
        return process.exit();
    });
};

exports.action = action;