var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('combined'));

app.use(express.static(__dirname + '/public'));
//__dirname and __filename gives you the full path to the file and directory for current module

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
// Note that the server was not created maually like in the previous example, it's done by 
//express when you run app.listen 