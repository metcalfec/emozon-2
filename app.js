var express = require('express');
var app = express();

app.use(express.static('./public/'));

app.get('/', function(req, res) {
});

app.listen(1313, function() {
  console.log('Listening on port 1313');
})
