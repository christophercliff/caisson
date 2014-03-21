var _ = require('underscore')
var own = require('own')
var Promise = require('bluebird')

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

    _mapFns: function (command) {
        return _.chain(this.plugins)
            .compact()
            .map(function(p){ return p[command] })
            .value()
    }

}

exports.create = create

function create() {
    return Object.create(PROTOTYPE, own({
        plugins: []
    }))
}
