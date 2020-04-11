var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "game"
  });

var app = express();
app.listen(3000);
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/style.css', function(request, response) {
	response.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/home', function(request, response) {
	response.sendFile(path.join(__dirname + '/home.html'));
});
app.get('/index', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/auth', function(request, response) {
	var username = request.body.user;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM userlogin WHERE user = ? AND passcode = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				return response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/getGame', (req, res) => {

    con.query("SELECT * FROM game", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
	});
	
});