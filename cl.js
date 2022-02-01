  const async = require('async');
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

  Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].pid === a[j].pid)
                a.splice(j--, 1);
        }
    }
    return a;
  };

  if (options.state) {
    let final = [];
    craigslist.getLocationsByState(options.state, function(locations) {
      async.reduce(locations, [], function(memo, location, callback) {
        craigslist.search(location.location, options.category, options.query, options.max, function(posts) {
          memo = memo.concat(posts);
          callback(null, memo);
        });
      }, function(err, final) {
        console.log(final.unique());
      });
    });
  } else {
    craigslist.search(options.location, options.category, options.query, options.max, function(posts) {
      console.log(posts);
    });
  }


