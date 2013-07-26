var _ = require('underscore')
var exec = require('child_process').exec
var level = require('level')
var readdirp = require('readdirp')
var s3sync = require('s3-sync')

var CACHE_DIR = '.cache'

exports.action = push

function push(options, callback) {

    if (!_.isFunction(callback)) callback = function () {};
    if (!_.isString(options.build)) return callback(new Error('You must specify a build directory'));
    if (!_.isObject(options.awsConfig)) return callback(new Error('You must specify an AWS config'));
    if (!_.isObject(options.caissonConfig)) return callback(new Error('You must specify a Caisson config'));

    var db = level(CACHE_DIR)
    var syncer = s3sync(db, {
        key: options.awsConfig.accessKeyId,
        secret: options.awsConfig.secretAccessKey,
        //region: options.awsConfig.region,
        bucket: options.caissonConfig.root_domain
    })

    console.log('checking remote cache...')
    syncer.getCache(function(err){
        if (err) return callback(new Error(err))
        var files = readdirp({
            root: options.build,
            fileFilter: ['!.*']
        })
        files.pipe(syncer)
            .on('data', function(d){
                console.log(d.fullPath + ' -> ' + d.url)
            })
            .once('error', function(err){
                return callback(new Error(err))
            })
            .once('end', function(){
                console.log('updating remote cache...')
                syncer.putCache(function(err){
                    if (err) return error(err)
                    db.close(function(err){
                        if (err) return error(err)
                        exec('rm -r ' + CACHE_DIR, function(err){
                            if (err) return error(err)
                            callback(null)
                        });
                    })
                })
            })
    })
}
