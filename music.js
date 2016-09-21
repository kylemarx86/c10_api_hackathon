/**
 * Created by Weizguy on 9/20/2016.
 */

$(document).ready(function () {

    /**
     * Define all global variables here
     */
    var searchTerm = "";
    var url = "";

    /**
     * Clickhandler for ajaxCall
     */
    $('#ajaxCall').click(function () {
        searchItunes();
    });

    /**
     * Function to start the ajax call to itunes
     */
    function searchItunes() {
        searchTerm = $('#searchIt').val();
        url = "https://itunes.apple.com/search?media=music&order=popular&term=" + searchTerm + " soundtrack&callback=?";

        $.getJSON(url, function (data) {

            $('#musicSrc').attr('src', data.results[0].previewUrl);
            $('#musicImg').attr('src', data.results[0].artworkUrl100);
            $('#artistName').text(data.results[0].artistName);
            $('#music').attr('src', data.results[0].previewUrl);
        });

    }

    /**
     * Create the music player
     */
    var music = document.getElementById("music");
    music.pause();
    music.volume = 1.0;

});