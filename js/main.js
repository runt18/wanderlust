var photo = require('./photo.coffee');
var weather = require('./weather.coffee');
var accomodation = require('./accomodation.coffee');
var travel = require('./travel.coffee');
var util = require('./util.coffee');
var cities = require('./cities.coffee');

var city = cities[util.choice(cities)];

weather(city);
accomodation(city);
travel(city);
photo(city);

var suggestions = ['How about visiting', 'Why not go to', 'Escape to', 'You should visit', 'Take a trip to'];

var rejections = ['No thanks.', "I'd rather not.", 'Show me something different', "Yeah, I'm good.", 'Hmm. Keep trying.'];

$('h2').text(suggestions[util.choice(suggestions)]);

$('.rejection').text(rejections[util.choice(rejections)]);

$(document).ready(function() {
  $('.name').text(city);

  $('.btn-danger').on('click', function() {
    location.reload(true);
  });

  $('#place-link').attr('href', "https://www.google.com/maps/dir/my%20location/" + city + "/");

  $('.full-overlay').fadeOut(3000);
});
