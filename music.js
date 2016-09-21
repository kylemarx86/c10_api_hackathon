/**
 * Created by Weizguy on 9/20/2016.
 */


$(document).ready(function () {

    var searchTerm = "";
    var url = "";

    $('#search').click(function () {

        searchTerm = $('#searchIt').val();
        console.log(searchTerm);
        url = "https://itunes.apple.com/search?media=music&sort=popular&term=" + searchTerm + " soundtrack&callback=?";

        $.getJSON(url, function (data) {

            var music = document.getElementById("music");

            $('#musicSrc').attr('src', data.results[0].previewUrl);
            $('#musicImg').attr('src', data.results[0].artworkUrl100);
            $('#artist').text(data.results[0].artistName);
            $('#music').attr('src', data.results[0].previewUrl)
            music.pause();
            music.volume = 1.0;
        });
    });

    // var results = [];
    //$('#search').click(function(){
    // function search() {
    //
    //     $.ajax({
    //         dataType: 'json',
    //         method: 'GET',
    //         params: {term: 'rocky3', callback: '?'},
    //         url: 'https://itunes.apple.com/search?term=rocky&callback=?',
    //         success: function (response) {
    //             if (response.success) {
    //                 console.log("success");
    //                 results = response.results;
    //             } else
    //                 console.log("fail");
    //         }
    //     });
    // }
    //});


});