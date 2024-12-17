const WeatherForm = document.querySelector(".weatherform");
const CityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
apikey = "5441054862ad357b85ff1e7e138c1cd0";

WeatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = CityInput.value;
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayinfo(weatherdata);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }

    }
    else {
        displayError("please enter a city");
    }
});
async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not fetch weather data")
    }
    return await response.json(); 
}
function displayinfo(data) {
    const {name:city, main:{temp, humidity},weather:[{description,id}]} = data;
    card.textContent="";
    card.style.display="flex";
    const cityDisplay  = document.createElement("h1");
    const tempdisplay  = document.createElement("p");
    const humidDisplay  = document.createElement("p");
    const descDiaplay  = document.createElement("p");
    const WeatherEmoji  = document.createElement("p");

    cityDisplay.textContent = city;
    tempdisplay.textContent= `${(temp - 273.15).toFixed(1)}°C`;
    humidDisplay.textContent = `humidity: ${humidity}%`;
    descDiaplay.textContent= description;
    WeatherEmoji.textContent= getemoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempdisplay.classList.add("tempdisplay");
    humidDisplay.classList.add("humidDisplay");
    descDiaplay.classList.add("descDiaplay");
    WeatherEmoji.classList.add("WeatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humidDisplay);
    card.appendChild(descDiaplay);
    card.appendChild(WeatherEmoji);

}
function getemoji(weatherid) {
    switch(true){
        case(weatherid>=200 && weatherid<300):
           return "⛈️";
        case(weatherid>=300 && weatherid<400):
            return "🌧️";
        case(weatherid>=500 && weatherid<600):
            return "🌧️";
        case(weatherid>=600 && weatherid<700):
            return "❄️";
        case(weatherid>=700 && weatherid<800):
            return "🌫️";
        case(weatherid===800 ):
            return "☀️";
        case(weatherid>=801 && weatherid<810):
            return "☁️";
        default :
            return "❓";

    }

}
function displayError(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errorDisplay");
    card.textContent = "";

    card.style.display = "flex";
    card.appendChild(errordisplay);

}
