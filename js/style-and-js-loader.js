(function () {
    function ignoreCache(actualPath) {
        return actualPath + '/abc=' + Math.random();
    }

    // function to loading css and js dynamically
    function loadjscssfile(filename, filetype, forceReload = false) {
        filename = forceReload ? ignoreCache(filename) : filename;
        if (filetype == "js") { //if filename is a external JavaScript file
            let fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        }
        else if (filetype == "css") { //if filename is an external CSS file
            let fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref !== "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        console.log(filename + ' loaded');
    }

    //Below are some examples to load them
    //loadjscssfile("myscript.js", "js") //dynamically load and add this .js file
    //loadjscssfile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
    //loadjscssfile("mystyle.css", "css") ////dynamically load and add this .css file


    //First load css, order matters as per normal css rules
    loadjscssfile("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css", "css");

    //Load all your site specific css after
    loadjscssfile("css/style-1.css", "css");
    loadjscssfile("css/style-2.css", "css");

    //Then load the third party JS files, JS loading order matters, so jquery must be loaded before bootstrap.
    loadjscssfile("https://code.jquery.com/jquery-3.3.1.slim.min.js", "js");
    loadjscssfile("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js", "js");
    loadjscssfile("https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js", "js");

    //Now load our Javascript files for other functionality

})();