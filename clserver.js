

const craigslist = require('./craigslist.js');
const async = require('async');

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    'cl.proto',
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var proto = grpc.loadPackageDefinition(packageDefinition).classifieds;
 
function categories(call, callback) {
    craigslist.getCategories(function(data) {
        callback(null, 
            {
                categories: data
            }
        );
    });
}

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
  
function search(call, callback) {
    craigslist.getLocationsByState(call.request.state, function(locations) {
        async.reduce(locations, [], function(memo, location, callback) {
          craigslist.search(location.location, call.request.code, call.request.query, call.request.maxPrice, function(posts) {
            memo = memo.concat(posts);
            callback(null, memo);
          });
        }, function(err, final) {
            callback(null, {posts: final.unique()})
        });
    });
}
var server = new grpc.Server();
server.addService(proto.Classifieds.service,
                        {Categories: categories, Search: search});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
server.start();
});
