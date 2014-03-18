var Caisson = require('../')
var s3 = require('../lib/plugins/s3')

describe('Caisson', function(){

    it('should', function(done){
        Caisson.create()
            .use(s3({ test: 'test' }))
            .up(function(err){
                if (err) throw err
                return done()
            })
    })

})
