////THE MOVIE DATABASE AJAX CALL TEST
/**
 * makeFirstAjaxCall - makes a request to The Movie DB to return search results via AJAX
 */
function makeFirstAjaxCall() {
    console.log("SEARCH BUTTON CLICKED");
    console.log("FUNCTION START");
    var dataToSendServer = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4",
        query: "inception"
    };
    console.log("BEGIN AJAX");
    $.ajax({
        data: dataToSendServer,
        dataType: "JSON",
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?",
        error: function (response) {
            console.log("THERE WAS AN ERROR: " + response);
        },
        success: function (response) {
            var searchResults = response;
            console.log(searchResults.results[0]);
            $("<h1>").text(searchResults.results[0].original_title).appendTo("#divForImage");
            $("<p>").text(searchResults.results[0].overview).appendTo("#divForImage");

        }
    });
    console.log("END AJAX CALL")
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
    $("#ajaxCall").click(makeFirstAjaxCall);
    $("#movieInfo").click(makeSecondAjaxCall);
}
/**
 * makeSecondAjaxCall - makes a request to The Movie DB to return "details" data from a specific movie via AJAX
 */
function makeSecondAjaxCall() {
    console.log("GET MOVIE DETAILS");
    console.log("FUNCTION START");
    var apiKey = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4"
    };
    console.log("BEGIN AJAX");
    $.ajax({
        data: apiKey,
        dataType: "JSON",
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/27205?", //notice the string of numbers which is the path parameter. Each movie has a unique ID in the database
        error: function (response) {
            console.log("THERE WAS AN ERROR: " + response);
        },
        success: function (response) {
            var movieData = response;
            console.log("success!");
            console.log(movieData);
            $("<h1>").text(movieData.original_title).appendTo("#divForQuote");
            $("<h2>").text(movieData.tagline).appendTo("#divForQuote");
            $("<h3>").text(movieData.release_date).appendTo("#divForQuote");
            $("<p>").text(movieData.overview).appendTo("#divForQuote");
        }
    });
    console.log("END");
}
////TODO: HOLD api-key => key AS ONE VARIABLE?
////TODO: PATH PARAMETERS?