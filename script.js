////THE MOVIE DATABASE AJAX CALL TEST
/**
 * makeAjaxCall - makes an ajax call to The Movie DB API
 */
function makeAjaxCall() {
    console.log("BUTTON CLICKED");
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
            $("img").remove();
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
 * addClickHandlers - and click handler functions to dom element
 */
function addClickHandlers() {
    $("button").click(makeAjaxCall);
}

