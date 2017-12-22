var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

function auth (req, res, next) {
    console.log(req.headers); //If the authentication header is set.
    
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
    }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));
//__dirname and __filename gives you the full path to the file and directory for current module

app.use(function(err,req,res,next) {

        res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
// Note that the server was not created maually like in the previous example, it's done by 
//express when you run app.listen 

// <script>document.execCommand('ClearAuthenticationCache', 'false');</script>
//from wiki page, Microsoft Internet Explorer offers a dedicated JavaScript method to clear cached credentials:[3]