var AWS = require('aws-sdk'),
    _ = require('underscore'),
    findit = require('findit'),
    async = require('async');

module.exports = exports = function (options, callback) {
    
    if (!_.isFunction(callback)) callback = function () {};
    
    var domain = options.domain,
        build = './assets/build_default',
        finder = findit.find(build),
        files = [],
        s3;
    
    AWS.config.update(options.awsConfig);
    
    s3 = new AWS.S3();
    
    console.log('Pushing directory ' + build);
    
    finder.on('file', function(file){
        files.push(file);
        s3.putObject({
            Bucket: 'caisson.co',
            Key: file.replace(build + '/', '')
        }, function(err, res){
            files = _.without(files, file);
            return console.log('Pushed object ' + file);
        });
    });
    
    finder.on('end', function(){
        async.until(function(){
            return files.length === 0;
        }, function(c){
            return setTimeout(c, 100);
        }, function(){
            return callback(console.log('Push complete'));
        });
    });
    
};