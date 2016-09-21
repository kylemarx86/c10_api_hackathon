$.ajax({
  type: "POST",
  headers: {
    "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V"
  },
  dataType: 'json',
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies'      
}).then(function(res) {
  console.log(res);
  var quote = res.quote;
  var author = res.author;
  var endPoint = 'http://www.omdbapi.com/?t=' + author + '&y=&plot=short&r=json';
  console.log(quote + ' - ' + author);
  $('h3').text(quote);
  $('#movie').text('- ' + author);
  return $.ajax({
    type: "GET",
    url: endPoint
  });
}).then(function(res) {
  var plot = res.Plot;
  if (res.Plot == undefined || res.Plot == 'N/A') plot = "plot not found";
  console.log(plot);
  $('#plot').text(plot);
});