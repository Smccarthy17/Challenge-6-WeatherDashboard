var searchButton = document.getElementById('searchButton');
var searchCity = document.getElementById('city');
var forecast = document.getElementById('forecast');
const apiKey = 'cc14ffc03b442925b564b8a1b5bba2c9';

searchButton.addEventListener('click', function () {
    displayWeather();
});
function uvindex(lat, lon) {
    var request2URL =
        'http://api.openweathermap.org/data/2.5/onecall?lat=' +
        lat +
        '&lon=' +
        lon +
        '&units=imperial&appid=' +
        apiKey +
        '&exclude=minutely,hourly,alerts';

    fetch(request2URL)
        .then(function (response2) {
            return response2.json();
        })
        .then(function (data) {
            console.log('THIS IS UVI DATA', data);
            // console.log(data.current.uvi);
            var currentUVI = document.getElementById('uvi');
            currentUVI.textContent = data.daily[0].uvi;
            displayFiveday(data.daily);
        });
}
// funtions to fetch API's to show present and future weather
function displayWeather() {
    var city = searchCity.value;
    var request1URL =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',us&units=imperial&appid=' +
        apiKey;

    fetch(request1URL)
        .then(function (response1) {
            return response1.json();
        })

        .then(function (data) {
            var currentTempEl = document.getElementById('temp');
            var currentWindEl = document.getElementById('wind');
            var currentHumidityEl = document.getElementById('humidity');
            var cityname = document.getElementById('cityname');
            var currentDates = moment.unix(data.dt).format('MM/DD/YYYY');
            var imageEl = document.createElement('img');
            var imageIcon = data.weather[0].icon;

            imageEl.src =
                'http://openweathermap.org/img/w/' + imageIcon + '.png';
            cityname.innerHTML = data.name + ' ' + currentDates;
            cityname.appendChild(imageEl);
            currentTempEl.textContent = data.main.temp;
            currentWindEl.textContent = data.wind.speed;
            currentHumidityEl.textContent = data.main.humidity;
            // console.log(data.main.temp);
            // console.log(data.wind.speed);
            // console.log(data.main.humidity);
            uvindex(data.coord.lat, data.coord.lon);
        });
}

function displayFiveday(daily) {
    // console.log(daily);
    for (i = 1; i < 6; i++) {
        console.log(daily[i]);
        // console.log(daily[i].dt);
        console.log(daily[i].humidity);
        // console.log(daily[i].temp.day);
        // console.log(daily[i].wind_speed);
        // console.log(daily[i].weather[0].icon);
        var dates = document.createElement('p');
        var currentDates = moment.unix(daily[i].dt).format('MM/DD/YYYY');
        // console.log(currentDates);
        dates.textContent = currentDates;
        forecast.appendChild(dates);
        var imageEl = document.createElement('img');
        imageEl.src =
            'http://openweathermap.org/img/w/' +
            daily[i].weather[0].icon +
            '.png';
        // console.log(imageEl);
        forecast.appendChild(imageEl);
        var tempEl = document.createElement('p');
        tempEl.textContent = 'temp: ' + daily[i].temp.day;
        forecast.appendChild(tempEl);
        var windEl = document.createElement('p');
        windEl.textContent = 'wind speed: ' + daily[i].wind_speed;
        forecast.appendChild(windEl);

        var humidityEl = document.createElement('p');
        humidityEl.textContent = 'humidity: ' + daily[i].humidity;
        forecast.appendChild(humidityEl);
    }
}
