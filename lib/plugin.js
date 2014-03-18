var _ = require('highland')
var helper = require('./helper')

var PROTOTYPE = {

    up: function (callback) {
        helper.nextTick(callback)(null)
    },

    down: function (callback) {
        helper.nextTick(callback)(null)
    },

    push: function (callback) {
        helper.nextTick(callback)(null)
    }

}

module.exports = create

function create(options) {
    return Object.create(_.extend(options, _.extend(PROTOTYPE, {})))
}
