/*
This javascript file is necessary for connecting the client side to the server side
-The main functionality of this page for creating our HTTP requests for grabbing
a specific player, team, or match for the user to view. Our application is used for
comparing and analyzing simple player/team stats so there are not many requests
that we need to create
-This file also works with packages that allow us to conduct web scrapping activities
in order to grab a players shooting percentage by each quarter and their percentage
with a certain time left within each quarter
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars');

const index = require('./routes/index');
const player = require('./routes/player');
const team = require('./routes/team');
const prediction = require('./routes/prediction');

const app = express();
//variables for each database
const sqlite3 = require('sqlite3');
const players = new sqlite3.Database('players.db');
const teams = new sqlite3.Database('teams.db');
const games = new sqlite3.Database('games.db');


//variables are necessary for web scrapping shooting percentage per quarter
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//GET request to get a player's shooting percentage per quarter
app.get('/scrape/:name', (req, res) =>{
  const playerSearch = req.params.name;
  let first = playerSearch.charAt(0);
  let last = "";
  let found = false;
  for(let x=1; x < playerSearch.length; x++){
    if(playerSearch.charAt(x) == playerSearch.charAt(x).toUpperCase()){
      found = true;
    }
    if(found){
      last += playerSearch.charAt(x);
    }else{
      first += playerSearch.charAt(x);
    }
  }
  const shortUrl = last.substring(0,5).toLowerCase() + first.substring(0,2).toLowerCase();
  let fgUrl = 'https://www.basketball-reference.com/players/' + last[0].toLowerCase() + '/' + shortUrl + '01/shooting/2018';
  if((first == "Anthony" && last == "Davis") || (first == "Markieff" && last == "Morris")){
    fgUrl = 'https://www.basketball-reference.com/players/' + last[0].toLowerCase() + '/' + shortUrl + '02/shooting/2018'
  }
  const test = [];
  rp(fgUrl)
    .then((data) =>{
      let $ = cheerio.load(data);
      $('tr').each(function(i, element){
        var a = $(this).prev();
        //console.log(a.text());
        if(a.text().includes("1st") || a.text().includes("2nd") || a.text().includes("3rd") || a.text().includes("4th")){
          test.push(a.text().substring(a.text().indexOf("."),a.text().indexOf(".") + 4));
        }
        if(a.text().includes("minutes")){
          test.push(a.text().substring(a.text().indexOf("."),a.text().indexOf(".") + 4));
        }
      });
      res.send(test);
    })
});

//GET request that will show a json of all players in the database
app.get('/players', (req,res) =>{
  var queryParameter = req.query;
  console.log(queryParameter);
	players.all('SELECT * FROM playerstable', (err, rows) => {
    res.send(rows);
  });
});

//GET request for grabbing a specific player from the database
app.get('/players/:playerName', (req,res) => {
	const playerSearch = req.params.playerName;
  let first = playerSearch.charAt(0);
  let last = "";
  let found = false;
  for(let x=1; x < playerSearch.length; x++){
    if(playerSearch.charAt(x) == playerSearch.charAt(x).toUpperCase()){
      found = true;
    }
    if(found){
      last += playerSearch.charAt(x);
    }else{
      first += playerSearch.charAt(x);
    }
  }
  const fullName = first + " " + last;
  players.all(
    'SELECT * FROM playerstable WHERE name LIKE $name', //SQL query
    { $name: fullName}, //parameters to pass into SQL query
    (err, rows) => {
      if(rows.length > 0){
        res.send(rows[0]);
      }else{
        res.send({});
      }
    });
});

//GET request to find a specific team's data
app.get('/findTeam/:teamName', (req, res) => {
  const teamSearch = req.params.teamName;
  console.log('TESTING: ' + teamSearch);
  players.all(
    'SELECT * FROM playerstable WHERE team = $team',
    {$team: teamSearch},
    (err, rows) => {
      if(rows.length > 0){
        console.log("it worked");
        res.send(rows);
      }else{
        res.send({});
      }
    });
});

//GET request to display all teams in the NBA
app.get('/teams', (req, res) => {
  teams.all('SELECT team, abv, overall, home, road FROM teamstable', (err, rows) =>{
    res.send(rows);
  });
});


//GET request to grab a specific teams data
app.get('/teams/:teamName', (req, res) => {
  const teamSearch = req.params.teamName;
  teams.all('SELECT * FROM teamstable WHERE abv = $team',
    {$team: teamSearch},
    (err, rows) => {
      if(rows.length > 0){
        res.send(rows[0]);
      }else{
        res.send({});
      }
  });
});

//GET request to grab all games played in the 2017-2018 season
app.get('/matches', (req,res) => {
  games.all('SELECT visitor, visitorPoints, home, homePoints FROM gamestable', (err, rows) => {
    res.send(rows);
  });
});

//GET request to grab all games played by a specific team in the 2017-2018 season
app.get('/matches/:teamName', (req,res) => {
  const teamSearch = req.params.teamName;
  const val = fakeMatches[teamSearch];
  if(val){
    res.send(val);
  }else{
    res.send({}); //failed so return empty object
  }
});

app.get('/', index.view);
app.get('/player', player.view);
app.get('/team', team.view);
app.get('/prediction', prediction.view);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
