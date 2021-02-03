const express = require("express");
const bodyParser = require("body-parser");
const rethink = require("rethinkdb");
const Routes = require('./route');
const port = 3231;
let connection = null;

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//   next();
// });

Routes(app);

// START LISTENING SERVER 
app.listen(port, () => {
    rethink.connect( {host: 'localhost', port: 28015,db:'ReactExpress'}, function(err, conn) {
        if (err) throw err;
       console.log('Connected Rethink DB');
       console.log(`Example app listening on port ${port}!`);
       connection = conn;
    })
  });