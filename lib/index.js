var _ = require('underscore')
var assert = require('assert')
var async = require('async')
var helper = require('./helper')
var own = require('own')

var PROTOTYPE = {

    use: function (plugin) {
        this.plugins.push(plugin)
        return this
    },

    up: function (callback) {
        callback = helper.nextTick(callback)
        var tasks = _.map(this.plugins, function(p){ return p.up.bind(null, this) }, this)
        async.series(tasks, callback)
    },

    down: function (callback) {
        callback = helper.nextTick(callback)
        var tasks = _.map(this.plugins, function(p){ return p.down.bind(null, this) }, this)
        async.series(tasks, callback)
    },

    push: function (callback) {
        callback = helper.nextTick(callback)
        var tasks = _.map(this.plugins, function(p){ return p.push.bind(null, this) }, this)
        async.series(tasks, callback)
    }

}

exports.create = create

function create() {
    return Object.create(PROTOTYPE, own({
        plugins: []
    }))
}
