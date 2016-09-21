////THE MOVIE DATABASE AJAX CALL TEST
/**
 * makeFirstAjaxCall - makes a request to The Movie DB to return search results via AJAX
 */
function makeAjaxCall() {
    console.log("BUTTON CLICKED");
    console.log("FUNCTION START");
    var dataToSendServer = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4",
        query: "star wars vii"
    };
    var apiKey = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4" // for second ajax call
    };
    console.log("BEGIN AJAX");
    $.ajax({
        data: dataToSendServer,
        dataType: "JSON",
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?",
        error: function (response) {
            console.log("THERE WAS AN ERROR: " + response);
        }
    }).then(function (response) {
        var result = response.results[0];
        console.log(result);
        var movieID = result.id;
        var url = 'https://api.themoviedb.org/3/movie/' + movieID + '?';
        $.ajax({
            data: apiKey,
            dataType: "JSON",
            method: "GET",
            url: url,
            error: function (response) {
                console.log("THERE WAS AN ERROR: " + response);
            },
            success: function (response) {
                var movieData = response;
                console.log("success!");
                console.log(movieData);
                var moviePoster = "http://image.tmdb.org/t/p/original" + movieData.backdrop_path;
                $("body").css('background-image', 'url(' + moviePoster + ')');
                $("<h1>").text(movieData.original_title).appendTo("#divForQuote");
                $("<h2>").text(movieData.tagline).appendTo("#divForQuote");
                $("<h3>").text(movieData.release_date).appendTo("#divForQuote");
                $("<p>").text(movieData.overview).appendTo("#divForQuote");
            }
        })
    })
}

/**
 * call addClickHandlers on page load
 */
$(document).ready(function () {
    addClickHandlers();
    console.log("PAGE LOADED")
});
/**
 * addClickHandlers - and click handler functions to dom elements
 */
function addClickHandlers() {
    $("#movieInfo").click(makeAjaxCall);
}
