express = require("express"),
db = require('redis').createClient({
    host: '127.0.0.1',
    port: 6379
});

// Create server
var app = express();

app.get('/', function(req, res) {
    
    db.incr('visits', (err, reply) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Visitor number: ' + reply);
    });

});

app.listen(8000);
console.log("Listening on 127.0.0.1:8000");
