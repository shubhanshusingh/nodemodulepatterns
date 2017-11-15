var faker = require('faker');

var os = require('os')
// faker.locale = "en_IND";
// var fs = require('fs')
// var logger = fs.createWriteStream(__dirname + '/bigDataSet.json' , {
//     flags: 'a' // 'a' means appending (old data will be preserved)
// })
//
// // generate bigDataSet as example
//
// for(var i = 2001; i <=3000; i++){
//     logger.write(JSON.stringify({"index":{"_id":i}}));
//     logger.write(os.EOL);
//     var f = faker.helpers.createCard();
//     f.ip = "23.41.253.217";
//     logger.write(JSON.stringify(f));
//     logger.write(os.EOL);
// };

// logger.end();
console.log(os.tmpdir())