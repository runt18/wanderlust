module.exports = function(city) {
  var url = 'airbnb.com/s/';
  var proxy = 'https://cors-anywhere.herokuapp.com/';

  city = encodeURIComponent(city);
  proxy = proxy + url + city;

  $('#airbnb-link').attr('href', 'https://' + url + city);

  console.log(url);

  $.ajax({
    url: proxy,
    success: function(data) {
      var average, doc, prices, sum;

      doc = $(data);
      prices = doc.find('.price-amount');
      sum = 0;

      prices.each(function() {
        sum += parseInt($(this).text(), 10);
      });

      average = Math.round(sum / prices.length);

      $('.price').text(average);
    },
    error: function(err) {
      console.error(err);
    }
  });
};
