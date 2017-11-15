var express = require('express');
var router = express.Router();
var ksks = require('./module1')
var Logger = require('./module2')
/* GET home page. */
var cE = require('./custom_emitter');
router.get('/', function (req, res, next) {

    // logger = new Logger('cool')
    // logger1 = new Logger('cool1')
    // Logger.prototype.log = function (message) {
    //
    //     console.log("tttttt" + message)
    // }
    // logger.info('yo')
    // logger1.info('yo1')
    // const c = new cE();
    // var emt = c.getEmitter()
    // process.hrtime()
    // emt.once('logged', function (msg) {
    //
    //     console.log(msg + 'kdkdkdkdkdkkddkkd')
    // })
    //
    // c.log('wojo')
    //
    // var emt1 = c.getEmitter();
    // if (emt == emt1) {
    //     console.log(true);
    // }
    coolFunction("printValue",function (err,result) {
        if(err)
        {
            console.log(err);
        }

        console.log(result)
    })
    res.render('index', {title: 'Express'});
});


function coolFunction(printValue,callback) {

    callback("there is an error","executed")
}

module.exports = router;
