
let iconElement = document.querySelector(".weather-icon")

let tempElement = document.querySelector(".temperature-value")

let descElement = document.querySelector(".temperature-description")

let locationElement = document.querySelector(".location")

let notificationElement = document.querySelector(".notification")


const KELVIN = 273;

const KEY = "557649e032ece54a4a3deeb3dab01bd6";


const weather = {
    temperature: {
        value: 35,
        unit: "celsius"
    },
    description: "Clear Sky",
    iconID: "01d",
    city: "LONDON",
    country: "GB"
}





function displayWeather() {
    console.log('hello')
    // iconElement.innerHTML = `<img src="./icons/${weather.iconID}.png"/>`
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconID}@2x.png"/>`;


    tempElement.innerHTML = `<p>${weather.temperature.value} °<span>C</span></p>`
    descElement.innerHTML = `${weather.description}`
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}



tempElement.addEventListener("click", () => {
    if (weather.temperature.value == undefined) return;
    if (weather.temperature.unit === "celsius") {
        let fehrenheit = celsiusToFehrenheit(weather.temperature.value)
        fehrenheit = Math.floor(fehrenheit);
        tempElement.innerHTML = `<p>${fehrenheit} °<span>F</span></p>`
        weather.temperature.unit = "fehrenheit"

    } else {
        tempElement.innerHTML = `<p>${weather.temperature.value} °<span>C</span></p>`
        weather.temperature.unit = "celsius"
    }
})

function celsiusToFehrenheit(tempValue) {
    return tempValue * 9 / 5 + 32;
}







function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>"

    }
}

let setPosition = (position) => {
    console.log(position)
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

let showError = (error) => {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}




function getWeather(lat, lon) {

    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=557649e032ece54a4a3deeb3dab01bd6`

    fetch(URL)
        .then(response => response.json())
        .then((data) => {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = data.weather[0].description
            weather.iconID = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        }).then(() => {
            displayWeather();
        })
}



getLocation();