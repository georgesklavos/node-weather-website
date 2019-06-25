const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f6ca6fff4aa00f17f34ab4aada1dbba5/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather servise!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary}It is currently ${body.currently.temperature} degrees out. There is a ${
          body.currently.precipProbability
        }% chance of rain.The temprature today will be between ${body.daily.data[0].temperatureLow} and ${
          body.daily.data[0].temperatureHigh
        } degrees`
      );
    }
  });
};

module.exports = forecast;
