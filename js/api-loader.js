"use strict";
const ourAppUrl = "http://localhost:18080/demp-app3";
(function () {

    function ignoreCache(actualPath) {
        return actualPath + '?abc=' + Math.random();
    }

    function appendScriptTag(filename, forceReload = false) {
        filename = forceReload ? ignoreCache(filename) : filename;
        let scriptElement = document.createElement('script');
        scriptElement.setAttribute("type", "text/javascript");
        scriptElement.setAttribute("src", filename);
        document.head.appendChild(scriptElement);
    }

    function appendStylesheet(filename, forceReload = false) {
        filename = forceReload ? ignoreCache(filename) : filename;
        let stylesheetElement = document.createElement("link");
        stylesheetElement.setAttribute("rel", "stylesheet");
        stylesheetElement.setAttribute("type", "text/css");
        stylesheetElement.setAttribute("href", filename);
        document.head.appendChild(stylesheetElement);
    }

    function appendTemplate(templatePath) {
        window.addEventListener("load", () =>
            axios.get(templatePath).then((resp => document.body.appendChild(htmlToElement(resp.data)))));
    }

    console.log("Start loading API");
    //First load css, order matters as per normal css rules
    //Forced reload not required for other frameworks just our site files
    appendStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css");

    //Loading global css after boostrap
    appendStylesheet(ourAppUrl + "/css/global-style.css", true);

    //Then load the third party JS files, JS loading order matters, so jquery must be loaded before bootstrap.
    appendScriptTag("https://code.jquery.com/jquery-3.3.1.slim.min.js");
    appendScriptTag("https://unpkg.com/axios/dist/axios.min.js"); // Axios is used to make http calls, I am using it for loading html templates
    appendScriptTag("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js", true);
    appendScriptTag("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js", true);

    //Now loading our other modules
    appendScriptTag(ourAppUrl + "/js/util.js", true);
    appendStylesheet(ourAppUrl + "/weather-module/weather-style.css", true);
    appendScriptTag(ourAppUrl + "/weather-module/weather.js", true);
    appendTemplate(ourAppUrl + "/weather-module/weather-template.html");

    //Load other modules in the same way

    console.log("Finished loading API at " + new Date().toString());
})();