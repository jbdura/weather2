const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-desc p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// Weather Data
const weather:{} = {};

weather.temperature = {
    unit: "celsius"
};

const kelvin = 273

