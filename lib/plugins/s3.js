module.exports = function (options) {
    return {
        up: up.bind(null, options)
    }
}

function up(options, caisson, callback) {
    process.nextTick(function(){
        return callback(null)
    })
}
