(function () {
    "use strict";
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

    console.log("Start loading API");
    //First load css, order matters as per normal css rules
    //Forced reload not required for other frameworks just our site files
    appendStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css");

    //Load all our site specific css after boostrap
    appendStylesheet("css/global-style.css", true);

    //Then load the third party JS files, JS loading order matters, so jquery must be loaded before bootstrap.
    appendScriptTag("https://code.jquery.com/jquery-3.3.1.slim.min.js");
    appendScriptTag("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js", true);
    appendScriptTag("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js", true);

    //Now load our Javascript files for other functionality


    console.log("API loaded successfully");
})();