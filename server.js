`use strict`;

//Application dependencies
const express = require('express');

const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');

//this allows us to join front-end and back-end files from different folders

//loads environment variables from .env
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/location', (request, response) => {
  searchToLatLong(request.query.data)
    .then(location => response.send(location))
    .catch(error => handleError(error, response));
})

app.get('/weather', getWeather);
app.get('/yelp', getYelp);
app.get('/movies', getMovie);

app.listen(PORT, () => console.log(`Listsening on ${PORT}`));

//Helper Functions
function searchToLatLong(query) {

  checkLocation({
    tableName = 
  });





  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GOOGLE_API_KEY}`;

  return superagent.get(url)
    .then(result => {
      // return {
      //   search_query: query,
      //   formatted_query: result.body.results[0].formatted_address,
      //   latitude: result.body.results[0].geometry.location.lat,
      //   longitude: result.body.results[0].geometry.location.lng
      // }
      response.send(new Location(request, result));
    })
    .catch(error => handleError(error));
}

function getWeather (request, response) {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${request.query.data.latitude},${request.query.data.longitude}`;
  return superagent.get(url)
    .then((result) => {
      response.send(result.body.daily.data.map((day) => new Weather(day)));
    })
    .catch(error => handleError(error, response));
}

function getYelp (request, response) {
  const url = `https://api.yelp.com/v3/businesses/search?location=${request.query.data.search_query}`;

  superagent.get(url)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then((result) => {
      const yelpArray = result.body.businesses.map(food => {
        return new Yelp(food);
      })
      response.send(yelpArray);
    })
    .catch(error => handleError(error, response));
}

function getMovie (request, response) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THE_MOVIE_DB_API}&query=${request.query.data.search_query}`;

  superagent.get(url)
    .then((result) => {
      response.send(result.body.results.map( movie => new Movie(movie)));
    })
    .catch(error => handleError(error, response));
}


function handleError (error, response) {
  console.error(error);
  if(response) return response.status(500).send('Sorry something went terribly wrong.');
}

//Constructors
function Location(query, result) {
  this.search_query = query;
  this.formatted_query = result.body.results[0].formatted_address;
  this.latitude = result.body.results[0].geometry.location.lat;
  this.longitude = result.body.results[0].geometry.location.lng;
  tableName = locations;
}

function Weather (day) {
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
  this.forecast = day.summary;
}

function Yelp (food) {
  this.name = food.name;
  this.image_url = food.image_url;
  this.price = food.price;
  this.rating = food.rating;
  this.url = food.url;
}

function Movie (film) {
  this.title = film.title;
  this.overview = film.overview;
  this.average_votes = film.vote_average;
  this.total_votes = film.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
  this.popularity = film.popularity;
  this.released_on = film.release_date;
}

//SQL Codes
const checkLocation = (location) => {
  const SQL = `SELECT * FROM locations WHERE search_query=$1;`;
  const values = [location.query];

  return client.query(SQL, values)
    .then(result => {
      //if exits in db
      if(result.rowCount > 0) {
        location.cacheHit(result.rows[0]);
      }
      else {
        location.cacheMiss();
      }
    })
    .catch(console.error);
}
