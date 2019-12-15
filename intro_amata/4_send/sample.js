var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var indexPage = fs.readFileSync('./index.html', 'utf-8');
var server = http.createServer(function(req, res){
    if (req.method == 'GET'){
        var urlParts = url.parse(req.url, true);
        console.log('---GET Request---');
        console.log('name is ' + urlParts.query.name);
        console.log('age is ' + urlParts.query.age);
    } else {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end',function(){
            var params = qs.parse(body);
            console.log('---POST Request---');
            console.log('name is ' + params.name);
            console.log('age is ' + params.age);
        });
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(indexPage);
    res.end();
});

server.listen(8080);
console.log('Server Started');