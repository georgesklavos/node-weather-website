const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const place = document.querySelector('#place');
const title = document.querySelector('.location');
const places = document.querySelector('#places');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = 'Loading...';
  title.textContent = '';
  places.textContent = '';
  if (document.querySelector('.days')) {
    let days = document.querySelector('.days');
    days.parentNode.removeChild(days);
  }
  fetch(`/geocode?address=${location}`).then(response => {
    // response.json().then(data => {
    //   if (data.error) {
    //     message1.textContent = data.error;
    //   } else {
    //     message1.textContent = data.location;
    //     message2.textContent = data.forecast;
    //   }
    // });
    response.json().then(data => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = '';
        console.log(data.places);
        data.places.forEach(el => {
          //console.log(el.place_name);

          places.insertAdjacentHTML('beforeend', `<div id = "place" class = "class" > ${el.place_name} </div>`);
        });

        const weather = event => {
          console.log(event.target);
          data.places.forEach(el => {
            if (event.target.innerText === el.place_name) {
              console.log('mpika');
              var longitude = el.center[0];
              var latitude = el.center[1];
              document.querySelector('.main-content').insertAdjacentHTML('beforeend', `<div class = 'days' ></div>`);
              showWeather(longitude, latitude, el.place_name);
            }
          });
        };

        places.addEventListener('click', weather);
      }
    });
  });
  document.querySelector('input').value = '';
});

const showWeather = (longitude, latitude, finalLocation) => {
  console.log(longitude + ' kai ' + latitude);
  message1.textContent = 'Loading...';
  places.textContent = '';
  fetch(`/weather?longitude=${longitude}&latitude=${latitude}`).then(response => {
    message1.textContent = '';
    response.json().then(data => {
      title.textContent = finalLocation;
      console.log(data.currently.temperature);
      for (i = 0; i <= 4; i++) {
        let time = convertTime(data.daily[i].time);
        console.log(data.daily[i]);
        let currentTemp;
        let unit = `°C`;
        let humidity = (data.daily[i].humidity * 100).toFixed(0);
        let windSpeed = Math.round(data.daily[i].windSpeed);
        let visibility = Math.floor(data.daily[i].visibility);
        let precipProbability = (data.daily[i].precipProbability * 100).toFixed(0);
        if (i === 0) {
          currentTemp = `
          <div id = title >Current Temp</div>
          <div class = current id = number>${data.currently.temperature}${unit}</div>
          `;
        } else {
          currentTemp = '';
        }

        document.querySelector('.days').insertAdjacentHTML(
          'beforeend',
          `<div
           class='day-${i}' id="day">
           <div class = 'date-${i}'> ${time}</div>
           <div class="weather-icon-${i}"></div>
           <div class="temp-Max-${i}" id = 'temp'>Max:${data.daily[i].temperatureMax}${unit}</div>
           <div class="temp-Min-${i}" id = 'temp' id = temp-Min>Min:${data.daily[i].temperatureMin}${unit}</div> 
           <div class="wind-speed-${i}" id = 'title'>Wind Speed</div>
           <div class="wind-${i}" id = number>${windSpeed}mph</div>
           <div class="humidity-${i}" id = 'title'>Humidity</div>
           <div class="humidity-number-${i}" id = 'number'>${humidity}%</div>
           <div class="visibility-${i}" id = 'title'>Visibility</div>
           <div class="visibility-number-${i}" id = 'number'>${visibility}mi</div>
           <div class="pressure-${i}"></div>
           <div class="pressure-number-${i}"></div>
           <div class="predictability-${i}" id = 'title'>Precipitation</div>
           <div class="predictability-number-${i}" id = 'number'>${precipProbability}%</div>
           ${currentTemp}
        </div>`
        );
      }
    });
  });
};

const convertTime = UNIXtime => {
  let date = new Date(UNIXtime * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months[date.getMonth()];
  let day = date.getDate();
  time = `${day} ${month}`;
  return time;
};
