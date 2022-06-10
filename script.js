var searchButton = document.getElementById('searchButton');
var searchCity = document.getElementById('city');
const apiKey = 'cc14ffc03b442925b564b8a1b5bba2c9';

console.log(searchButton);
searchButton.addEventListener('click', function () {
    console.log(searchCity.value);
    displayWeather();
});

// funtions to fetch API's to show present and future weather
function displayWeather() {
    var city = searchCity.value;
    var request1URL =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',us&units=imperial&appid=' +
        apiKey;
    var lat = response2.coord.lat;
    var lon = response2.coord.lon;
    var request2URL =
        'http://api.openweathermap.org/data/2.5/onecall?lat=' +
        lat +
        '&lon=' +
        lon +
        '&units=imperial&appid=' +
        apiKey;

    fetch(request1URL)
        .then(function (response1) {
            console.log(response1);
            return response1.json();
        })
        .then(function (data) {
            console.log(data);
            var currentTempEl = document.getElementById('temp');
            currentTempEl.textContent = data.main.temp;
            currentTempEl.textContent = data.wind.speed;
            currentTempEl.textContent = data.main.humidity;
            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.main.humidity);
        });

    fetch(request2URL).then(function (response2) {
        console.log(response2);
        return response2.json();
    });
    // .then(function (data) {
    // console.log(data);
    // var currentUVI = document.getElementById('')
    // })
}
