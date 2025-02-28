
let inp = document.querySelector("#city-input");
let btn = document.querySelector("#search-btn");

let url = "https://api.openweathermap.org/data/2.5/weather";
let api = API_KEY;

btn.addEventListener("click", () => {
    let city = inp.value;
    if (city.trim() !== "") {
        weather(city);
    }
    inp.value = "";
});

async function weather(city) {
    try {
        let res = await fetch(`${url}?q=${city}&appid=${api}&units=metric`);
        let data = await res.json();
        update(data);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// Function to convert Unix timestamp to 12-hour local time format
function convertToLocalTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

function update(data) {
    let cityy = document.querySelector(".mycity");
    let temp = document.querySelector("#temp");
    let day = document.querySelector("#day");
    let humd = document.querySelector("#humd");
    let mini = document.querySelector("#mini");
    let max = document.querySelector("#max");
    let feels = document.querySelector(".feels");
    let icon = document.querySelector(".weather-icon");
    let sunrise = document.querySelector("#sunrise");
    let sunset = document.querySelector("#sunset");
    let windspeed = document.querySelector("#windspeed");
    let body = document.body; 

    cityy.innerText = data.name; 
    temp.innerText = `${data.main.temp} \u00B0C`;
    day.innerText = `${data.weather[0].main}`;
    humd.innerText = `Humidity: ${data.main.humidity} %`;
    mini.innerText = `Min Temp: ${data.main.temp_min} \u00B0C`;
    max.innerText = `Max Temp: ${data.main.temp_max} \u00B0C`;
    feels.innerText = `Feels like: ${data.main.feels_like} \u00B0C`;
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    sunrise.innerText = `Sunrise: ${convertToLocalTime(data.sys.sunrise)}`;
    sunset.innerText = `Sunset: ${convertToLocalTime(data.sys.sunset)}`;

    let windSpeedKmH = (data.wind.speed * 3.6).toFixed(2);
    windspeed.innerText = `Wind Speed: ${windSpeedKmH} km/h`;

    // **Change gradient based on weather**
    let weatherCondition = data.weather[0].main.toLowerCase();
    if (weatherCondition.includes("clear")) {
        body.style.background = "linear-gradient(to bottom, #ffeb3b, #ff8900)";
    } else if (weatherCondition.includes("rain")) {
        body.style.background = "linear-gradient(to bottom, #4c4c4c, #1a1a1a)";
    } else if (weatherCondition.includes("cloud")) {
        body.style.background = "linear-gradient(to bottom, #9e9e9e, #222222)";
    } else if (weatherCondition.includes("snow")) {
        body.style.background = "linear-gradient(to bottom, #4c9cdf, #0c4c8a)";
    } else {
        body.style.background = "linear-gradient(to bottom, #4c9cdf, #0c4c8a)";
    }
}
