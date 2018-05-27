"use strict";

function loadWeatherData() {
    console.log("loading data");
    let zip = getFormField("weather-input-form", "zipCode");
    let country = getFormField("weather-input-form", "country");
    let url = "https://cors-proxy.htmldriven.com/?url=" + `http://samples.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=b6907d289e10d714a6e88b30761fae22`;
    console.log("Now firong request to " + url);
    axios.get(url).then((resp => document.getElementById("model_body_id").innerHTML = JSON.stringify(resp.data)));
}