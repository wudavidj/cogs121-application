
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars');

const index = require('./routes/index');
const player = require('./routes/player');
const compare = require('./routes/compare');
// Example route
// const user = require('./routes/user');

const app = express();

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

const fakeDataBase = {
	'Kobe': {ppg: '20', mpg: '40', best: 'Staples Center', worst: 'Moda Center', img: 'kobe.png'},
	'Lebron': {ppg: '25', mpg: '43', best: 'Quicken Loan Arena', worst: 'United Center', img: 'lebron.png'},
	'Kevin': {ppg: '30', mpg: '35', best: 'Oracle Arena', worst: 'Air Canada Centre', img: 'durant.png'},
	'James': {ppg: '33', mpg: '34', best: 'Toyota Center', worst: 'Wells Fargo Center', img: 'harden.png'},
	'Joel': {ppg: '22', mpg: '30', best: 'Wells Fargo Center', worst: 'TD Garden', img: 'embiid.png'}
};

const fakeMatches = {
  'Cavaliers': {opponent: 'Lakers'},
  'Rockets': {opponent: 'Clippers'},
  'Sixers': {opponent: 'Heat'},
  'Pelicans': {opponent: 'Warriors'},
  'Thunders': {opponent: 'Jazz'}
};

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Show all players to the screen
app.get('/players', (req,res) =>{
	console.log("get request is working");
	const allPlayers = Object.keys(fakeDataBase);
	res.send(allPlayers);
});

//grab one players information
app.get('/players/:playerName', (req,res) => {
	const playerSearch = req.params.playerName;
	const val = fakeDataBase[playerSearch];
	console.log(val);
	if(val){
		res.send(val);
	}else{
		res.send({}); //failed so return empty object
	}
});

app.get('/matches', (req,res) => {
   console.log("get match works");
   const allMatches = Object.keys(fakeMatches);
   res.send(allMatches);
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
app.get('/player', player.view);
app.get('/compare', compare.view)
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
