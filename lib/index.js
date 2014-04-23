var _ = require('underscore')
var own = require('own')
var Promise = require('bluebird')

var DEFAULT_CONFIG_PATH = './caisson.json'
var STATUSES = {
    up: 'up',
    down: 'down',
    pending: 'pending'
}
var PROTOTYPE = {

    use: function (plugin) {
        this.plugins.push(plugin)
        return this
    },

    up: function (callback) {
        var fns = this._mapFns('up')
        return series(fns)
            .bind(this)
            .nodeify(callback)
    },

    status: function (callback) {
        var fns = this._mapFns('status')
        return series(fns)
            .bind(this)
            .nodeify(callback)
    },

    push: function (callback) {
        var fns = this._mapFns('push')
        return series(fns)
            .bind(this)
            .nodeify(callback)
    },

    down: function (callback) {
        var fns = this._mapFns('down')
        return series(fns)
            .bind(this)
            .nodeify(callback)
    },

    _mapFns: function (fn) {
        return _.chain(this.plugins)
            .filter(function(p){ return _.isFunction(p[fn]) })
            .map(function(p){ return p[fn].bind(null, this) }, this)
            .value()
    }

}

// public

exports.create = create
exports.STATUSES = STATUSES

function create(configPath) {
    var obj
    configPath = configPath || DEFAULT_CONFIG_PATH
    obj = Object.create(PROTOTYPE, own({
        plugins: [],
        configPath: configPath,
        config: tryGetJSON(configPath)
    }))
    obj.constructor = exports
    return obj
}

// private

function series(fns) {
    return Promise.reduce(fns, function(previous, current){
        current = (current.length === 1) ? Promise.promisify(current) : current
        if (!previous) return current()
        return previous.then(current)
    }, null)
}

function tryGetJSON(path) {
    try {
        return require(path)
    } catch (ex) {
        return {}
    }
}
