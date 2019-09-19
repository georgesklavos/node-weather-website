const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and vies location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'George Sklavos'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'George Sklavos'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    HelpText: 'This is some helpful text',
    title: 'Help',
    name: 'George Sklavos'
  });
});

app.get('/geocode', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to provide an address!'
    });
  }

  geocode(req.query.address, (error, { places } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    places.forEach(el => {
      console.log(el.place_name);
    });
    res.send({
      places
    });
  });
});

app.get('/weather', (req, res) => {
  forecast(req.query.latitude, req.query.longitude, (error, daily, currently) => {
    if (error) {
      return res.send({
        error
      });
    }
    res.send({
      currently,
      daily
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help artcle not found',
    title: '404',
    name: 'George Sklavos'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'George Sklavos'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
