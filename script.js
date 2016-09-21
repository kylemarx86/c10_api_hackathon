/**
 * global variables
 */
var globalResult = null;

/**
 * test of api call to flickr
 */

var videoNumber = null;
/**
 * document load function
 */
$(document).ready(function () {
    addEventHandlers();
    videoNumber = 0;
});


function addEventHandlers() {
    $('button').click(function () {
        // searchByKeyword('terminator 2');

        updateVideo();
        videoNumber++;
        videoNumber %= 2;
    });
}


function updateVideo() {
    var videoId = null;
    if(videoNumber === 0){
        videoId = 'lwSysg9o7wE';
    }else {
        videoId = 'knxhiwUspsA';
    }
    var hrefMain = '//www.youtube.com/watch?v=';
    // var dataVideoIdMain = ''
    var srcMain = 'https://www.youtube.com/embed/'
    var srcExtra = '?cc_load_policy=1&amp;controls=2&amp;rel=0&amp;hl=en&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fsupport.google.com&amp;widgetid=1';

    //href
    //data-videoid
    //src

    $('#youTubeVid').attr({'href': hrefMain + videoId, 'data-videoid': videoId, 'src': srcMain + videoId + srcExtra});

}

// videos main link is    https://www.youtube.com/watch?v=


/**
 * This function searches for a video with the given keyword and appends the word ' official trailer' to the search term.
 * The video's ID is
 * of the search results are logged to Apps Script's log.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByKeyword(keyword) {
    keyword += ' trailer';

    $.ajax({
        dataType: 'jsonp',
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'get',
        data: {
            key: 'AIzaSyCJxCXv2qoUoEDzB7_GvxXJe_SqCJT_KJg',
            q: keyword,
            part: 'snippet',
            maxResults: 1
        },
        success: function (response) {
            console.log('we got a movie');
            var videoId = response.items[0].id.videoId;
            console.log(videoId);
            var newPar = $('<p>').text(videoId);
            $('body').append(newPar);
            var fullAddress = 'https://www.youtube.com/watch?v=' + videoId;
            console.log(fullAddress);
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
