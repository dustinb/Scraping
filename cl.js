var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');

var url = require('url');
var path = require('path');

var spider = require('./spider');

var location = '';
var category = '';
var page = 1;

// Process command line arguments
process.argv.forEach(function (val, index, array) {
  console.log(index + ' = ' + val);
  if (index == 2) {
    location = val;
  }
  if (index == 3) {
    category = val;
  }
  if (index == 4) {
    page = val;
  }

});

var scrapeURL = 'https://' + location + '.craigslist.org/search/' + category;

scrapeURL += '?min_price=1000&max_price=11000';
if (page > 1) {
  scrapeURL += '&s=' + ((page - 1) * 120);
}

console.log("About to pull " + scrapeURL);
spider.getURL(scrapeURL, pullPost, {location: location, code: category});

// Some examples
//spider.getURL('https://westslope.craigslist.org/search/rva', pullPost, {location: "westslope.craigslist.org", code: "rva"});
//spider.getURL('https://rockies.craigslist.org/search/rva', pullPost, {location: "rockies.craigslist.org", code: "rva"});

function pullPost(html, data) {

  var $ = cheerio.load(html);
  var records = [];

  // Collecting information from each post on the page
  if ($('li.result-row[data-pid]').length) {
    $('li.result-row[data-pid]').each(function(i) {
      //if (i>60) return false;

      var pid = $(this).data('pid');
      var postURL = $(this).find('a').first().attr('href');
      var title = $(this).find('a[data-id]').html();
      var price = $(this).find('span.result-price').html();
      //var location = $(this).find('span.result-hood').html();

      var imageList = $(this).find('a.result-image').data('ids');

      var image = '';
      if (typeof imageList != 'undefined') {
        var imageArray = imageList.split(',');
        image = 'https://images.craigslist.org/' + imageArray[0].substr(2) + '_300x300.jpg';
      }

      //var href = $(this).attr('href');
      //var parts = url.parse(href, true);

      var record = {
        pid: pid,
        title: title,
        price: price,
        location: data.location,
        category: data.code,
        image: image,
        url: postURL
      };

      records.push(record);

    });
  }

  // A way to download the image and pass these records into an external system or database using async.
  async.eachSeries(records, function(record, callback) {
    console.log(record);
    
    // comment to actually download images and do something with the data
    callback();
    return;

    if (record.image !== '') {
      var parsed = url.parse(record.image);

      // Download the image then do the post
      request.get(record.image).pipe(fs.createWriteStream('/tmp/' + path.basename(parsed.pathname))).on('close', function () {
        record.image = '/tmp/' + path.basename(parsed.pathname);
        request.post({
          url: 'http://YOURWEBSITES/post/new',
          form: record
        }, function(error, response, body) {
          console.log(body);
          callback();
        });
      });
    } else {
      request.post({
        url: 'http://YOURWEBSITE/post/new',
        form: record
      }, function(error, response, body) {
        console.log(body);
        callback();
      });
    }
  });

}
