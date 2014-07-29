module.exports = function(city) {
  var url = 'http://somewhere-server.jit.su/' + encodeURIComponent(city);

  $.getJSON(url, function(data) {
    $('#t1').attr('href', data[0].url).text(data[0].name);
    $('#t2').attr('href', data[1].url).text(data[1].name);
    return $('#t3').attr('href', data[2].url).text(data[2].name);
  });
};
