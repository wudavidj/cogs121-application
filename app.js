
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars');

const index = require('./routes/index');
const player = require('./routes/player');
const team = require('./routes/team');
const comparePlayer = require('./routes/comparePlayer');
const compareTeam = require('./routes/compareTeam');
const prediction = require('./routes/prediction');
// Example route
// const user = require('./routes/user');

const app = express();
const sqlite3 = require('sqlite3');
const players = new sqlite3.Database('players.db');
const teams = new sqlite3.Database('teams.db');
const games = new sqlite3.Database('games.db');

const request = require('request');
const cheerio = require('cheerio');

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

app.get('/scrape', (req, res) =>{
  const url = 'https://www.basketball-reference.com/players/j/jamesle01/shooting/2018';
  res.send({});
  request(url, (error, res, html) => {
    if(!error){
      const $ = cheerio.load(html);
      const first = null;
      const second = null;
      const third = null;
      const fourth = null;
      const json = {first: "", second:"", third:"",fourth:""};
      console.log($);
    }
  })
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Show all players to the screen
app.get('/players', (req,res) =>{
	players.all('SELECT * FROM playerstable', (err, rows) => {
    res.send(rows);
  });
});

//grab one players information
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
    'SELECT * FROM playerstable WHERE name = $name', //SQL query
    { $name: fullName}, //parameters to pass into SQL query
    (err, rows) => {
      if(rows.length > 0){
        res.send(rows[0]);
      }else{
        res.send({});
      }
    });
});


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

//gets all the teams
app.get('/teams', (req, res) => {
  teams.all('SELECT team, abv, overall, home, road FROM teamstable', (err, rows) =>{
    res.send(rows);
  });
});


//get a single team record
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

//gets all the matches
app.get('/matches', (req,res) => {
  games.all('SELECT visitor, visitorPoints, home, homePoints FROM gamestable', (err, rows) => {
    res.send(rows);
  });
});

app.get('/matches/:teamName', (req,res) => {
  const teamSearch = req.params.teamName;
  const val = fakeMatches[teamSearch];
  console.log(val);
  if(val){
    res.send(val);
  }else{
    res.send({}); //failed so return empty object
  }
});

app.get('/', index.view);
//app.get('/indexOriginal', indexOriginal.view);
app.get('/player', player.view);
app.get('/team', team.view);
app.get('/comparePlayer', comparePlayer.view);
app.get('/compareTeam', compareTeam.view);
app.get('/prediction', prediction.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
