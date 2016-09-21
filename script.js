/**
 * global variables
 */

/**
 * document load function
 */
$(document).ready(function () {
    addEventHandlers();
});


/**
 *
 */
function addEventHandlers() {
    $('button').click(function () {
        updateVideo();
    });
}



function updateVideo() {
    searchYouTubeByKeyword('star wars episode vii');
}


/**
 * This function searches for an video official movie trailer for a given movie on youTube.
 * The function will take a movie title (keyword) and appends the phrase ' official trailer' to the search term.
 * The video's ID is stored and then used in the appropriate attributes (href, data-videoid, and src) in the iframe video on the index.
 * Note that this sample limits the results to 1.
 * @param
 * @return
 */
function searchYouTubeByKeyword(keyword) {
    keyword += ' official trailer';
    var result = null;

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
            // console.log('we got a movie');
            var videoId = response.items[0].id.videoId;
            var hrefMain = '//www.youtube.com/watch?v=';
            var srcMain = 'https://www.youtube.com/embed/';
            var srcExtra = '?cc_load_policy=1&amp;controls=2&amp;rel=0&amp;hl=en&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fsupport.google.com&amp;widgetid=1';

            $('#youTubeVid').attr({'href': hrefMain + videoId, 'data-videoid': videoId, 'src': srcMain + videoId + srcExtra});
            // $('#widget2').attr({'href': hrefMain + videoId, 'data-videoid': videoId, 'src': srcMain + videoId + srcExtra});
        },
        error: function (response) {
            console.log('what a failure?');
        }
    });
    // var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
    // for(var i in results.items) {
    //     var item = results.items[i];
    //     console.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    // }
}
