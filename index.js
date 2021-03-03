// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// Server port
var HTTP_PORT = process.env.PORT || 5000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

app.get("/", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var sql = "select * from DS_DB WHERE col_1 IN (SELECT col_1 FROM DS_DB ORDER BY RANDOM() LIMIT 10)"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});