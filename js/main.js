var photo = require('./photo');
var weather = require('./weather');
var accomodation = require('./accomodation');
var travel = require('./travel');
var util = require('./util');
var cities = require('./cities');

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

  if (!isWeb) {
    $('.chrome-apps-link').click(function() {
      chrome.tabs.create({url:'chrome://apps'});
    });
  }
});
