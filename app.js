var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static('./public/'));

app.get('/', function(req, res) {
});

app.listen(port, function() {
 console.log("listening on port " + port);
});
