/**
 * global variables
 */
var globalResult = null;

/**
 * test of api call to flickr
 */


/**
 * document load function
 */
$(document).ready(function () {
    addEventHandlers();
});


function addEventHandlers() {
    $('button').click(function () {
        searchByKeyword('terminator+2');
    });


}

// videos main link is    https://www.youtube.com/watch?v=


/**
 * This function searches for videos related to the keyword 'dogs'. The video IDs and titles
 * of the search results are logged to Apps Script's log.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByKeyword(keyword) {
    keyword += '+trailer';

    $.ajax({
        dataType: 'jsonp',
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'get',
        key: 'AIzaSyCJxCXv2qoUoEDzB7_GvxXJe_SqCJT_KJg',
        q: keyword,
        part: 'snippet',
        maxResults: 5,
        // type: 'video',
        success: function (response) {
            console.log('we got a movie');
            globalResult = response;
            // console.log(response);
        },
        error: function () {
            console.log('what a failure?');
        }

    });

    // var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
    // for(var i in results.items) {
    //     var item = results.items[i];
    //     console.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    // }
}
