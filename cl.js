
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

  craigslist.search(options.location, options.category, options.query, options.max, function(posts) {
    console.log(posts);
  });


