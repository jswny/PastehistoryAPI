var http = require('http');
var url = require('url');
var mysql = require('mysql');

var requestListener = function(req, res) {

  var client_ip = req.connection.remoteAddress;

  var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'paste'
  });

  conn.connect();

  var query = url.parse(req.url, true).query;

  var result;

  switch(query.cmd) {
    case "get":
      var pid = query.id;

      if (typeof pid != 'undefined') {
        conn.query('SELECT * FROM archive WHERE pid="' + pid + '"', function(err, rows, fields) {
          if (err) throw err;

          if (rows.length > 0) {
            result = rows[0];
          } else {
            result = 'Paste not archived!';
          }

          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(result));
          console.log('Request recieved on URL ' + req.url + ' from IP ' + client_ip + ' SUCCESS!');
        });
      } else {
        result = 'Invalid options!';
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
        console.log('Request recieved on URL ' + req.url + ' from IP ' + client_ip + ' FAILED: bad options!');
      }

      break;

    case "search":
      var keyword = query.keyword;

      if (typeof keyword != 'undefined') {
        conn.query('SELECT * FROM archive WHERE title LIKE "%' + keyword + '%" OR text LIKE "%' + keyword + '%"', function(err, rows, fields) {
          if (err) throw err;

          if (rows.length > 0) {
            result = rows;
          } else {
            result = 'No results!';
          }

          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(result));
          console.log('Request recieved on URL ' + req.url + ' from IP ' + client_ip + ' SUCCESS!');
        });
      } else {
        result = 'Invalid options!';
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
        console.log('Request recieved on URL ' + req.url + ' from IP ' + client_ip + ' FAILED: bad options!');
      }

      break;

    default:
      result = 'Invalid options!';
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
      console.log('Request recieved on URL ' + req.url + ' from IP ' + client_ip + ' FAILED: bad options!');
  }

  conn.end();
};

var server = http.createServer(requestListener);
server.listen(1337);
