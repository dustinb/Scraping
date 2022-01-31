
  const craigslist = require('./craigslist.js');
  const commandLineArgs = require('command-line-args')

  const optionDefinitions = [
    {
      name: 'location',
      alias: 'l',
      type: String,
      description: 'Location'
    },
    {
      name: 'state',
      alias: 's',
      type: String,
      description: 'Search whole state'
    },
    {
      name: 'category',
      alias: 'c',
      type: String,
      description: 'Category'
    },
    {
      name: 'max',
      alias: 'm',
      type: String,
      description: 'Max Price'
    },
    {
      name: 'query',
      alias: 'q',
      type: String,
      description: 'Search query'
    }
  ];

  const options = commandLineArgs(optionDefinitions);

  if (options.state) {
    craigslist.getLocationsByState(options.state, function(results) {
      results.forEach(function(value) {
        craigslist.search(value.location, options.category, options.query, options.max, function(posts) {
          console.log(posts);
        });
      });
    });
  } else {
    craigslist.search(options.location, options.category, options.query, options.max, function(posts) {
      console.log(posts);
    });
  }


