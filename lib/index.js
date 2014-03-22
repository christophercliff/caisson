var _ = require('underscore')
var fs = require('fs')
var own = require('own')
var path = require('path')
var Promise = require('bluebird')

var DEFAULT_CONFIG_PATH = './caisson.json'
var PROTOTYPE = {

    use: function (plugin) {
        this.plugins.push(plugin)
        return this
    },

    up: function (callback) {
        var fns = this._mapFns('up')
        return Promise
            .reduce(fns, function(previous, current){
                current = Promise.promisify(current)
                if (!previous) return current()
                return previous.then(current)
            }, null)
            .bind(this)
            .nodeify(callback)
    },

    down: function (callback) {
        var fns = this._mapFns('down')
        return Promise
            .reduce(fns, function(previous, current){
                current = Promise.promisify(current)
                if (!previous) return current()
                return previous.then(current)
            }, null)
            .bind(this)
            .nodeify(callback)
    },

    push: function (callback) {
        var fns = this._mapFns('push')
        return Promise
            .reduce(fns, function(previous, current){
                current = Promise.promisify(current)
                if (!previous) return current()
                return previous.then(current)
            }, null)
            .bind(this)
            .nodeify(callback)
    },

    _writeConfig: function () {
        return Promise.promisify(fs.writeFile)(path.resolve(__dirname, this.configPath), JSON.stringify(this.config))
    },

    _mapFns: function (fn) {
        return _.chain(this.plugins)
            .filter(function(p){ return _.isFunction(p[fn]) })
            .map(function(p){ return p[fn].bind(null, this) }, this)
            .value()
    }

}

exports.create = create

function create(configPath) {
    configPath = configPath || DEFAULT_CONFIG_PATH
    return Object.create(PROTOTYPE, own({
        plugins: [],
        configPath: configPath,
        config: tryGetJSON(configPath)
    }))
}

function tryGetJSON(path) {
    try {
        return require(path)
    } catch (ex) {
        return {}
    }
}
