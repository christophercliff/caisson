var AWS = require('aws-sdk'),
    _ = require('underscore'),
    findit = require('findit'),
    fs = require('fs'),
    async = require('async'),
    mime = require('mime');

var IGNORE_RE = /^\.[^/].*|\/\..+/g;

var push = function (options, callback) {

    if (!_.isFunction(callback)) callback = function () {};
    if (!_.isString(options.build)) return callback(new Error('You must specify a build directory'));
    if (!_.isObject(options.awsConfig)) return callback(new Error('You must specify an AWS config'));
    if (!_.isObject(options.caissonConfig)) return callback(new Error('You must specify a Caisson config'));

    var finder = findit.find(options.build),
        files = [],
        s3 = new AWS.S3(options.awsConfig);

    console.log('Pushing directory ' + options.build);

    finder.on('file', function(file){
        if (!!IGNORE_RE.exec(file)) return;
        files.push(file);
        fs.readFile(file, function(err, data){
            s3.putObject({
                Bucket: options.caissonConfig.root_domain,
                Key: file.replace(options.build + '/', ''),
                Body: data,
                ContentType: mime.lookup(file)
            }, function(){
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

exports.action = push;
