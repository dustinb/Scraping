var cheerio = require('cheerio');

//var async = require('async');
//var fs = require('fs');

//var url = require('url');
//var path = require('path');

var spider = require('./spider');
var airbnb = process.argv[2];

console.log(airbnb);

// Process command line arguments
// Index 2 probably a Airbnb or vrbo #
process.argv.forEach(function (val, index, array) {
  //console.log(index + ' = ' + val);
});

var url = "https://www.airbnb.com/rooms/" + airbnb;

spider.getURL(url, pullData, {airbnb: airbnb});

//fs.readFile(airbnb + '.html', 'utf8', function(err, contents) {
//  pullData(contents, {});
//});

//console.log("About to pull " + scrapeURL);
//spider.getURL(scrapeURL, pullData, {extra: 'data'});

// Select things we are looking for (sites/categories)
// spider.getJSON('/res/pb/searches');

// Bedroom 1..n
// Common Spaces

// x single bed(s)
// x double bed(s)
// x queen bed(s)
// x king bed(s)

// x sofa bed(s)
// x bunk beds(s)

function pullData(html, data) {

  var $ = cheerio.load(html);
  var bedroom = 1;
  while($('strong:contains("Bedroom ' + bedroom + '")').length) {
    console.log("Bedroom " + bedroom);
    console.log($('strong:contains("Bedroom ' + bedroom + '")').parent().next().text());
    bedroom++;
  }

  if($('strong:contains("Common spaces")').length) {
    console.log("Common spaces");
    console.log($('strong:contains("Common spaces")').parent().next().text());
  }
}
