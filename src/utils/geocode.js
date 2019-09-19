const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2Vvcmdlc2siLCJhIjoiY2p3dGprNWVpMDFwNDQ3bW93bG9rdG0yOSJ9.fY7y9UASnQV6A7N0PO-XHg&limit=10`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      console.log('geocode ' + body.features);
      callback(undefined, {
        places: body.features
      });
      // callback(undefined, {
      //   latitude: body.features[0].center[1],
      //   longitude: body.features[0].center[0],
      //   location: body.features[0].place_name
      // });
    }
    //console.log(callback.toString());
  });
};

module.exports = geocode;
