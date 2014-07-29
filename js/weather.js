module.exports = function(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  url = url + encodeURIComponent(city);

  $.getJSON(url, function(data) {
    $('.degrees').text(Math.round(data.main.temp - 273.15));
    $('.weather').text(data.weather[0].description);

    var end = {
      latitude: data.coord.lat,
      longitude: data.coord.lon
    };

    var map = new GMaps({
      div: '#map',
      lat: end.latitude,
      lng: end.longitude,
      zoom: 10
    });

    map.addMarker({
      lat: end.latitude,
      lng: end.longitude
    });

    var href = "http://forecast.io/#/f/" + end.latitude + "," + end.longitude;

    $('#weather-link').attr('href', href);

    if (navigator.geolocation) {
      rnavigator.geolocation.getCurrentPosition(function(pos) {
        var dist, plane_speed, price, start, travel_time;

        start = pos.coords;
        dist = Math.round(geolib.getDistance(start, end) / 1609.34);
        plane_speed = 500;
        travel_time = (dist / plane_speed).toFixed(1);
        price = Math.round(50 + dist * 0.11);

        $('.distance').text(dist);
        $('.travel-time').text(travel_time);
        $('.flight-price').text(price);
      });
    }
    else {
      console.log('Geolocation is not supported by this browser.');
    }
  });
};
