
  const craigslist = require('./craigslist.js');
  craigslist.getCategories(function(data) {
    console.log(data);
  });
  