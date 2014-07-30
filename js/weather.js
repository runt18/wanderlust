var metresToMiles = function(metres) {
  var metresPerMile = 1609.34;
  return Math.round(metres / metresPerMile);
};

var milesToTime = function(miles) {
  var planeSpeed = 500;
  return Math.round(miles / planeSpeed);
};

var milesToPrice = function(miles) {
  return Math.round(50 + miles * 0.11);
};

var kelvinToCelcius = function(kelvin) {
  var offset = 273.15;
  return Math.round(kelvin - offset);
};

module.exports = function(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  url = url + encodeURIComponent(city);

  $.getJSON(url, function(data) {
    var celcius = kelvinToCelcius(data.main.temp);
    var description = data.weather[0].description;

    $('.degrees').text(celcius);
    $('.weather').text(description);

    var end = {
      latitude: data.coord.lat,
      longitude: data.coord.lon
    };

    var href = "http://forecast.io/#/f/" + end.latitude + "," + end.longitude;

    $('#weather-link').attr('href', href);

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      var start = position.coords;
      var metres = geolib.getDistance(start, end);
      var miles = metresToMiles(metres);
      var travelTime = milesToTime(miles);
      var price = milesToPrice(miles);

      $('.distance').text(miles);
      $('.travel-time').text(travelTime);
      $('.flight-price').text(price);
    });
  });
};
