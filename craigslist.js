
var spider = require('./spider');
var cheerio = require('cheerio');

module.exports = {

  // Return all locations within a state
  getLocationsByState: function(state, done) {
    this.getSites(function(locations) {
      done(locations[state]);
    });
  },

  // Return all US sites
  getSites: function(done) {

    spider.getURL('https://www.craigslist.org/about/sites', function(html, data) {
      var $ = cheerio.load(html);
      var locations = {};

      $('h1 a[name="US"]').parent().next().find('h4').each(function () {
        var state = $(this).html();
        $(this).next().find('li a').each(function () {
          var location = $(this).attr('href').match(/https:..([a-z0-9]*)/);
          if (! location) return;
          if (typeof locations[state] == 'undefined') {
            locations[state] = []
          }
          locations[state].push({location: location[1], url: $(this).attr('href')});
        });
      });

      done(locations);
    });
  },

  // Search for something in specific location
  search: function(location, code, searchQuery, max, done) {
    var scrapeURL = 'https://' + location + '.craigslist.org/search/' + code;
    var query = [];

    if (searchQuery) {
      query.push('query=' + searchQuery);
    }
    if (max) {
      query.push('max_price=' + max);
    }
    if (query.length) {
      scrapeURL = scrapeURL + '?' + query.join('&');
    }

    console.log(scrapeURL);
    spider.getURL(scrapeURL, function pullPost(html, data) {
      var records = [];
      var $ = cheerio.load(html);

      // Collecting information from each post on the page
      if ($('li.result-row[data-pid]').length) {
        $('li.result-row[data-pid]').each(function (i) {

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

          var post = {
            pid: pid,
            title: title,
            price: price,
            location: data.location,
            category: data.code,
            image: image,
            url: postURL
          };
          records.push(post);

        });
      }
      done(records);
    });

  }
};
