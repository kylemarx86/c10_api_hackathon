/**
 * Project Name: SNAPPY TITLE
 * File Name: script.js
 * Author: Collette Tamez, Daniel Lee, Dave Weizenegger, Kyle Marx
 * Date: 09/21/2016
 * Objective: Hackathon project involving the combination of different data sources into an application or game
 * Prompt: https://github.com/Learning-Fuze/c10_api_hackathon/
 * @name            //??????????????????????to be filled in
 * @version         //??????????????????????to be filled in
 */

//??????????????????????????????????   global ??????????????
//????what is up with these?????????
/**
 * music - variable to create music player
 * @type {Element}
 */
var music = document.getElementById("music");
music.pause();
music.volume = 1.0;




/**
 * Listen for the document to load and calls addClickHandlers function
 */
$(document).ready(function () {
    addEventHandlers();
});

/**
 * @function addEventHandlers
 * Adds click handler functions to button to the movie search (#movieInfo) and random movie (#random) buttons in DOM
 * Also adds a keyup handler for the enter key to activate the same function that handles the movie search function
 * ??????????????????we could poossibly use the @fires here. prob not worth it though????????///
 */
function addEventHandlers() {
    $("#movieInfo").click(movieSearch);
    $('#search').keyup(function(e) {
        if (e.which === 13) {
            movieSearch();
        }
    });
    $("#random").click(quoteToMovie);
}


/**
 * Handler for the AJAX calls to the different APIs based on a user input
 * Function will take the user-generated value in the text input (#search) and store the value. This stored value will
 * be used to call three functions that themselves make AJAX calls to retrieve more information on the movie input
 * @function movieSearch
 */
function movieSearch() {
    var search = $('#search').val();
    retrieveDetailedMovieInfoFromTMDB(search);
    retrieveMovieTrailerFromYouTube(search);
    retrieveMusicFromITunes(search);
}

/**
 * Makes an AJAX call to famous quotes API to retrieve a random movie quote and the movie it is from.
 * This then calls the retrieveDetailedMovieInfoFromTMDB, retrieveMovieTrailerFromYouTube, and retrieveMusicFromITunes functions
 * on success to retrieve more information on the movie
 * @function quoteToMovie
 */
function quoteToMovie() {
    $.ajax({
        type: "POST",
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V"
        },
        dataType: 'json',
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies'
    }).then(function(res) {
        var quote = res.quote;      //local variable that holds value of the key "quote" in the response object
        var movie = res.author;     //local variable that holds value of the key "author" (which happens to be the movie the quote is from) in the response object

        $("<h2>").text('"' + quote + '"').appendTo("#divForQuote");
        retrieveDetailedMovieInfoFromTMDB(movie);
        retrieveMovieTrailerFromYouTube(movie);
        retrieveMusicFromITunes(movie);
    })
}


/**
 * Makes a request to The Movie DB to return search results via AJAX
 * @function retrieveDetailedMovieInfoFromTMDB
 * @param movie - the name of the movie we are trying to get more information about
 */
function retrieveDetailedMovieInfoFromTMDB(movie) {
    /** local variable that holds the data to send to The Movie DB database API in the first AJAX call */
    var dataToSendServerForFirstCall = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4",
        query: movie
    };
    /** local variable that holds the data to send to The Movie DB database in the second AJAX call */
    var dataToSendServerForSecondCall  = {
        api_key: "7e73e5037ed00682f5aae1e5b6d940a4"
    };
    /**
     * AJAX call to The Movie Database API that performs a search query based on the keyword variable
     */
    $.ajax({
        data: dataToSendServerForFirstCall,
        dataType: "JSON",
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?",
        /**
         * anonymous error function - lets the user know their search was invalid
         * @param response
         */
        error: function (response) {
            $("<h1>").text("We couldn't find anything!").appendTo("#divForQuote");
        }
        /**
         * anonymous success function - executes on success of first ajax call?
         * @param response
         */
    }).then(function (response) {
        var result = response.results[0];   //local variable that stores the object at index zero of the key "results" array in response object
        var movieID = result.id;        //local variable that stores the value of the key id in the results variable
        var urlForMovieData = 'https://api.themoviedb.org/3/movie/' + movieID + '?';    //stores the url to be sent to the data base that includes the necessary path parameter
        /** AJAX call to The Movie DB API to retrieve detailed movie information */
        $.ajax({
            data: dataToSendServerForSecondCall,
            dataType: "JSON",
            method: "GET",
            url: urlForMovieData,
            /**
             * anonymous error function letting the user know there was an error            //?????????????????????????consider for removal
             * @param response
             */
            error: function (response) {
                $("<h1>").text("We couldn't find anything!").appendTo("#divForQuote");
            },
            /**
             * anonymous success function to be handled on successful request. Appends selected information to DOM
             * @param response
             */
            success: function (response) {
                var movieData = response;       //local variable that stores the response object
                var moviePoster = "http://image.tmdb.org/t/p/original" + movieData.backdrop_path;       // local variable that concats URL needed to resolve a TMDB image and the backdrop_path image file path in response object
                $("#divForMovieInfo").empty();
                $("<img>").attr({
                    src: moviePoster
                }).appendTo("#divForImage");                //?????????????????????????????readability issue - should we reconsider moving to one line
                $("<h1>").text(movieData.original_title).appendTo("#divForMovieInfo");
                $("<h2>").text(movieData.tagline).appendTo("#divForMovieInfo");
                $("<h3>").text(movieData.release_date).appendTo("#divForMovieInfo");
                $("<p>").text(movieData.overview).appendTo("#divForMovieInfo");
            }
        })
    })
}

/**
 * This function updates the movie trailer by searching for an video official movie trailer of the given movie on youTube.
 * The function will take a movie title (keyword) and appends the phrase ' official trailer' to the search term.
 * The video's ID is stored and then used in the appropriate attributes (href, data-videoid, and src) in the iframe video on the index to allow the movie to play.
 * Note that this sample limits the results to 1.
 * @function retrieveMovieTrailerFromYouTube
 * @param {string} movie - the name of the movie we are trying to retrieve a trailer for
 */
function retrieveMovieTrailerFromYouTube(movie) {
    movie += ' official trailer';
    var result = null;
    $.ajax({
        dataType: 'jsonp',
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'get',
        data: {
            key: 'AIzaSyCJxCXv2qoUoEDzB7_GvxXJe_SqCJT_KJg',
            q: movie,
            part: 'snippet',
            maxResults: 1
        },
        success: function (response) {
            var videoId = response.items[0].id.videoId;     //video id for the movie trailer we found
            var hrefBeginning = '//www.youtube.com/watch?v=';       //start to the href attribute for the video
            var srcBeginning = 'https://www.youtube.com/embed/';         //start to the src attribute for the video
            var srcEnding = '?cc_load_policy=1&amp;controls=2&amp;rel=0&amp;hl=en&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fsupport.google.com&amp;widgetid=1';    //ending to th esrc attribute for the video

            $('#youTubeVid').attr({'href': hrefBeginning + videoId, 'data-videoid': videoId, 'src': srcBeginning + videoId + srcEnding});   //adding of the gathered attributes to the video element
        },
        error: function (response) {
            console.log('a failure occured');
        }
    });
}


/**
 * Function to start the AJAX call to iTunes        //???????????????????? is this an accurate definiton??????
 * @function retrieveMusicFromITunes
 * @param {string} movie - the name of the movie we are trying to retrieve a trailer for
 */

/////////////??????????????????????do we have a failure/error function for this
function retrieveMusicFromITunes(movie) {
    var url = "https://itunes.apple.com/search?media=music&order=popular&term=" + movie + " soundtrack&callback=?";
    $.getJSON(url, function (data) {
        $('#musicSrc').attr('src', data.results[0].previewUrl);
        $('#musicImg').attr('src', data.results[0].artworkUrl100);
        $('#artistName').text(data.results[0].artistName);
        $('#music').attr('src', data.results[0].previewUrl);
    });
}



