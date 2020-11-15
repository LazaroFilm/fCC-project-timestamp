// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get(`/api/timestamp/:reqDate`, (req, res) => {
  const { reqDate } = req.params;
  let unix = 0
  let utc = ""
  if (Date.parse(reqDate)) { // if the date is in a readable time format
    unix = Date.parse(reqDate);
    utc = new Date(reqDate).toUTCString()
    res.json({ unix, utc })
  } else if (/^\d{13}$/.test(reqDate)) { // if the time is in unix format
    unix = reqDate;
    utc = new Date(parseInt(reqDate)).toUTCString()
    res.json({ unix, utc })
  } else {
    res.json({ "error": "invalid Date" })
  }
})

// empty parameter returns current time
app.get(`/api/timestamp`, (req, res) => {
  const now = new Date();
  const unix = Date.parse(now);
  const utc = now.toUTCString();
  res.json({ unix, utc })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
