
  var cheerio = require('cheerio');
  var spider = require('./spider');
  var sprintf = require('sprintf-js').sprintf;
  var scrapeURL = 'https://www.craigslist.org/about/sites';

  console.log("About to pull " + scrapeURL);
  spider.getURL(
    scrapeURL, 
    function(html, data) {
      console.log('');
      var $ = cheerio.load(html); 
      $('h4').each(function() {
        if ($(this).html() == process.argv[2]) {
          $(this).next().find('li a').each(function () {
            var location = $(this).attr('href').match(/https:..([a-z0-9]*)/);
            console.log(sprintf('%20s %s', location[1], $(this).attr('href')));
          });
        }
      });
    } 
  );

