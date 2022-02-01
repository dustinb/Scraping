
var request = require('request');
//var jar = request.jar();
var fs = require('fs');
var md5 = require('md5');

/*
var cookie = request.cookie('password=C6E5E278ECDCE42F8BC3E08E029C37A0EF2C7F9A');
jar.setCookie(cookie, 'http://www.yamaha-triples.org');

var cookie = request.cookie('bbsmid=5042');
jar.setCookie(cookie, 'http://www.yamaha-triples.org');
*/

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {

  //jar: jar,

  getURL: async function(url, done, data) {
    
    if (typeof data == 'undefined') {
      var data = {};
    }
    data.md5 = md5(url);
    data.url = url;
    
    // Use cached version if exists
    if (fs.existsSync('cache/' + data.md5 + '.html')) {
      fs.readFile('cache/' + data.md5 + '.html', function(err, html) {
	      done(html, data);
      });
      return;
    }

    await sleep(2000);
    console.log(url);
    request({url: url, followRedirect: false}, function (error, response, html) {
      if (error) {
        console.log(error);
        return;
      }

      if (response.statusCode != 200) {
        console.log('Error Code: ' + response.statusCode);
        return;
      }

      fs.writeFile(data.md5 + '.html', html, function() {});

      done(html, data);
    });
  }
};

