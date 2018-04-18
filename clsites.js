
  const craigslist = require('./craigslist.js');
  const commandLineArgs = require('command-line-args')

  const optionDefinitions = [
    {
      name: 'state',
      alias: 's',
      type: String,
      description: 'State or area -s Minnesota'
    },
    {
      name: 'quiet',
      alias: 'q',
      type: Boolean,
      description: 'Only output the location names'
    }
  ];

  const options = commandLineArgs(optionDefinitions);

  if (options.state) {
    craigslist.getLocationsByState(options.state, function(locations) {
      if (options.quiet) {
        locations.forEach(function(value) {
          console.log(value.location);
        });
      } else {
        console.log(locations);
      }
    });
  } else {
    craigslist.getSites(function (locations) {
      console.log(locations);
    });
  }

