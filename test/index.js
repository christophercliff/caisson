var async = require('async')
var Caisson = require('../')
var Promise = require('bluebird')

describe('Caisson', function(){

    it('should run a promise-based plugin', function(done){
        var caisson = Caisson.create()
        var options = { breadcrumb: [] }
        caisson
            .use(promisePlugin(options))
            .up()
            .then(caisson.status)
            .then(caisson.push)
            .then(caisson.down)
            .done(function(){
                options.breadcrumb.join(',').should.equal('1-up,1-status,1-push,1-down')
                return done()
            })
    })

    it('should run a callback-based plugin', function(done){
        var caisson = Caisson.create()
        var options = { breadcrumb: [] }
        caisson.use(callbackPlugin(options))
        async.series([
            caisson.up.bind(caisson),
            caisson.status.bind(caisson),
            caisson.push.bind(caisson),
            caisson.down.bind(caisson)
        ], function(err){
            if (err) throw err
            options.breadcrumb.join(',').should.equal('2-up,2-status,2-push,2-down')
            return done()
        })
    })

    it('should run promise-based and callback-based plugins in order', function(done){
        var caisson = Caisson.create()
        var options = { breadcrumb: [] }
        caisson
            .use(promisePlugin(options))
            .use(callbackPlugin(options))
            .up()
            .then(caisson.status)
            .then(caisson.push)
            .then(caisson.down)
            .done(function(){
                options.breadcrumb.join(',')
                    .should.equal('1-up,2-up,1-status,2-status,1-push,2-push,1-down,2-down')
                return done()
            })
    })

    it('should pass the caisson object as the first argument to plugin methods', function(done){
        var caisson = Caisson.create()
        caisson
            .use({
                up: function (c, callback) {
                    c.constructor.should.equal(Caisson)
                    return process.nextTick(callback)
                },
                status: function (c, callback) {
                    c.constructor.should.equal(Caisson)
                    return process.nextTick(callback)
                },
                push: function (c, callback) {
                    c.constructor.should.equal(Caisson)
                    return process.nextTick(callback)
                },
                down: function (c, callback) {
                    c.constructor.should.equal(Caisson)
                    return process.nextTick(callback)
                }
            })
            .up()
            .then(caisson.status)
            .then(caisson.push)
            .then(caisson.down)
            .done(done)
    })

})

function promisePlugin(options) {
    return {
        up: function () {
            options.breadcrumb.push('1-up')
            return new Promise(function(resolve){ return process.nextTick(resolve) })
        },
        status: function () {
            options.breadcrumb.push('1-status')
            return new Promise(function(resolve){ return process.nextTick(resolve) })
        },
        push: function () {
            options.breadcrumb.push('1-push')
            return new Promise(function(resolve){ return process.nextTick(resolve) })
        },
        down: function () {
            options.breadcrumb.push('1-down')
            return new Promise(function(resolve){ return process.nextTick(resolve) })
        }
    }
}

function callbackPlugin(options) {
    return {
        up: function (c, callback) {
            options.breadcrumb.push('2-up')
            return process.nextTick(callback)
        },
        status: function (c, callback) {
            options.breadcrumb.push('2-status')
            return process.nextTick(callback)
        },
        push: function (c, callback) {
            options.breadcrumb.push('2-push')
            return process.nextTick(callback)
        },
        down: function (c, callback) {
            options.breadcrumb.push('2-down')
            return process.nextTick(callback)
        }
    }
}
