var AWS = require('aws-sdk'),
    _ = require('underscore'),
    findit = require('findit'),
    fs = require('fs'),
    async = require('async'),
    mime = require('mime');

var IGNORE_RE = /^\.[^/].*|\/\..+/g;

module.exports = exports = function (options, callback) {
    
    if (!_.isFunction(callback)) callback = function () {};
    
    var domain = options.domain,
        build = options.build,
        finder = findit.find(build),
        files = [],
        s3;
    
    AWS.config.update(options.awsConfig);
    
    s3 = new AWS.S3();
    
    console.log('Pushing directory ' + build);
    
    finder.on('file', function(file){
        if (!!IGNORE_RE.exec(file)) return;
        files.push(file);
        fs.readFile(file, function(err, data){
            s3.putObject({
                Bucket: 'caisson.co',
                Key: file.replace(build + '/', ''),
                Body: data,
                ContentType: mime.lookup(file)
            }, function(err, res){
                files = _.without(files, file);
                return console.log('Pushed object ' + file);
            });
        });
    });
    
    finder.on('end', function(){
        async.until(function(){
            return files.length === 0;
        }, function(c){
            return setTimeout(c, 100);
        }, function(){
            return callback(null);
        });
    });
    
};