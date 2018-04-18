
  var cheerio = require('cheerio');
  var spider = require('./spider');
  var sprintf = require('sprintf-js').sprintf;
  var scrapeURL = 'https://cosprings.craigslist.org/';

  const commandLineArgs = require('command-line-args')

  const optionDefinitions = [
    {
      name: 'quiet',
      alias: 'q',
      type: Boolean,
      description: 'Only output the location names',
    }
  ];

  const options = commandLineArgs(optionDefinitions);

  spider.getURL(scrapeURL, function(html, data) {

    var $ = cheerio.load(html);

    $('#sss li').each(function() {
      var code = $(this).find('a').data('cat');
      $(this).find('sup').remove();
      var text = $(this).find('span.txt').html();

      if (options.quiet) {
        console.log(code);
      } else {
        console.log(sprintf('%20s %s', text, code));
      }

    });

  });

