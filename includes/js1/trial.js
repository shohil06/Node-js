var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='Crimes_-_2001_to_present.csv';

var parser = parse({delimiter: ','}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
    doSomething(line).then(function() {
      // when processing finishes invoke the callback to move to the next one
      callback();
    });
  })
})
fs.createReadStream(inputFile).pipe(parser);
