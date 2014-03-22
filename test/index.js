var async = require('async')
var Caisson = require('../')

describe('Caisson', function(){

    it('should run in series and promise', function(done){
        var breadcrumb = []
        var caisson = Caisson.create()
        caisson
            .use({
                up: function (c, callback) {
                    breadcrumb.push('a')
                    process.nextTick(function(){
                        breadcrumb.push('b')
                        return callback(null)
                    })
                }
            })
            .use({
                up: function (c, callback) {
                    breadcrumb.push('c')
                    process.nextTick(function(){
                        breadcrumb.push('d')
                        return callback(null)
                    })
                }
            })
            .up()
            .then(caisson.up)
            .done(function(){
                breadcrumb.join('').should.equal('abcdabcd')
                return done()
            })
    })

    it('should run in series and callback', function(done){
        var breadcrumb = []
        var caisson = Caisson.create()
        caisson
            .use({
                up: function (c, callback) {
                    breadcrumb.push('a')
                    process.nextTick(function(){
                        breadcrumb.push('b')
                        return callback(null)
                    })
                }
            })
            .use({
                up: function (c, callback) {
                    breadcrumb.push('c')
                    process.nextTick(function(){
                        breadcrumb.push('d')
                        return callback(null)
                    })
                }
            })
        async.series([
            caisson.up.bind(caisson),
            caisson.up.bind(caisson)
        ], function(err){
            if (err) return done(err)
            breadcrumb.join('').should.equal('abcdabcd')
            return done()
        })
    })

    it('should run in series and promise', function(done){
        Caisson.create()
            .use({
                up: function (c, callback) {
                    c.should.be.an.Object
                    process.nextTick(callback)
                }
            })
            .up()
            .done(done)
    })

})
