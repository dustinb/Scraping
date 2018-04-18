
  const commandLineArgs = require('command-line-args');
  const craigslist = require('./craigslist.js');

  const optionDefinitions = [
    {
      name: 'port',
      alias: 'p',
      type: Number,
      description: 'Listen Port'
    },
    {
      name: 'token',
      alias: 'c',
      type: String,
      description: 'Slack validation token.  Only response to requests that have the correct token'
    }
  ];

  const options = commandLineArgs(optionDefinitions);

  console.log('Listening ' + options.port);

  /*
    From Slack slash command docs https://api.slack.com/slash-commands#responding_to_a_command,
    responses look something like this

    {
    "response_type": "in_channel|ephemeral",
    "text": "It's 80 degrees right now.",
    "attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
      ]
    }
   */

  const http = require('http');
  http.createServer(function(request, response) {
    // Process the parameters
    // sites|search|cats location cat query min max
    response.writeHead(200, {'Content-type':'application/json'});
    craigslist.search('westslope', 'mcy', 'yamaha', 500, function(posts) {
      var slackResponse = {
        response_type: "in_channel",
        text: "Found " + posts.length + " for " + "yamaha less than $500",
        attachments: []
      };

      for(let post of posts) {
        slackResponse.attachments.push(post.url);
      }

      response.write(JSON.stringify(slackResponse, null, 3));
      response.end()
    });
  }).listen(options.port);
