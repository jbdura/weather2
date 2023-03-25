const iconElement = document.querySelector(".weather-icon") as HTMLElement;
const tempElement = document.querySelector(".temperature-value p") as HTMLElement;
const descElement = document.querySelector(".temperature-desc p") as HTMLElement;
const locationElement = document.querySelector(".location p") as HTMLElement;
const notificationElement = document.querySelector(".notification") as HTMLElement;

// Weather Data
const weather:{} = {};

weather.temperature = {
    unit: "celsius"
};

// Constant values
const kelvin :number = 273

// API 
const apiKey: string = "82005d27a116c2880c8f0fcb866998a0"


// GeoLocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser does not support Geolocation.</p>';
}


// location
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
// location error
function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// API
function getWeather(latitude :number, longitude :number) {
    let api = `https://api.openweathermap.org/data/2.5//weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    // console.log(api)
    fetch(api)
        .then(function (res) {
            let data = res.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin)
            weather.description = data.weather[ 0 ].description;
            weather.iconId = data.weather[ 0 ].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        })
}

// Display weather
function displayWeather() {
    iconElement.innerHTML = `<img src="./src/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// conversion
celsiusToFar = function (temperature) {
    return (temperature * 9 / 5) + 32
}

// change far - cel
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFar(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


//Clock
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
    var CDate = new Date()
    var NewDate = CDate.toDateString();
    NewDate = NewDate + " - " + CDate.toLocaleTimeString();
    document.getElementById('ct').innerHTML = NewDate;
    display_c();
}
