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
app.use(express.static('public'))
app.engine('html', require('ejs').renderFile); 

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/home.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
	
});
app.get('/index', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/Login', function(request, response) {
	response.sendFile(path.join(__dirname + '/Login.html'));
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

app.post('/delete', (req, res) => {
	const id = req.body.id;
	con.query(`DELETE FROM game WHERE id = ${id}`, function (err, result, fields) {
		if (err) throw err;
		res.sendFile(path.join(__dirname + '/home.html'));
	});
});

var Pid;
app.post('/modify', (req, res) => {
	const id = req.body.id;
	Pid = id;
	res.redirect("/modify");
});

app.get('/modify', function(req, res) {
	res.render(__dirname + "/Modify.html", {id:Pid});
});

app.post('/Modi', (req, res) => {
	const id = req.body.id;
	const title = req.body.Title;
	const Desc = req.body.Description;
	con.query(`UPDATE game SET name = '${title}' , description = '${Desc}' WHERE id = ${id}`, function (err, result, fields) {
		if (err) throw err;
		res.redirect("/home");
	});
});
app.post('/CreateGame', (req, res) => {
	const title = req.body.Title;
	const Desc = req.body.Description;
	con.query(`INSERT INTO game (name, description) VALUES ('${title}' , '${Desc}')`, function (err, result, fields) {
		if (err) throw err;
		res.redirect("/home");
	});
});
app.get('/Create', function(req, res) {
	res.render(__dirname + "/Create.html", {id:Pid});
});