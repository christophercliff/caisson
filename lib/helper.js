var FN = function () {}

exports.nextTick = nextTick

function nextTick(fn) {
    if (typeof fn !== 'function') fn = FN
    return function () {
        var args = arguments;
        return process.nextTick(function(){
            return fn.apply(null, args)
        })
    }
}
