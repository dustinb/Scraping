
var request = require('request');
var jar = request.jar();
var fs = require('fs');
var md5 = require('md5');

/*
var cookie = request.cookie('password=C6E5E278ECDCE42F8BC3E08E029C37A0EF2C7F9A');
jar.setCookie(cookie, 'http://www.yamaha-triples.org');

var cookie = request.cookie('bbsmid=5042');
jar.setCookie(cookie, 'http://www.yamaha-triples.org');
*/

module.exports = {

  jar: jar,

  getURL: function(url, done, data) {
    console.log('getURL: ' + url);
    if (typeof data == 'undefined') {
      var data = {};
    }
    data.md5 = md5(url);
    data.url = url;
    
    // Use cached version if exists
    if (fs.existsSync(data.md5 + '.html')) {
      console.log('Using cached version of ' + url);
      fs.readFile(data.md5 + '.html', function(err, html) {
	done(html, data);
      });
      return;
    }

    request({url: url, jar: jar, followRedirect: false}, function (error, response, html) {
      if (error) {
        console.log(error);
        return;
      }

      if (response.statusCode != 200) {
        console.log('Error Code: ' + response.statusCode);
        return;
      }

      console.log('Saving ' + url + ' to ' + data.md5);
      fs.writeFileSync(data.md5 + '.html', html);

      done(html, data);
    });
  }
};

