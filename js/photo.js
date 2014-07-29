var util = require('./util.coffee');

module.exports = function(city) {
  var url = 'http://500px.com/search?';

  var params = {
    page: 1,
    q: city,
    type: 'photos',
    category: 'City+%26+Architecture',
    order: 'rating',
    license_type: 4,
    utf8: '%E2%9C%93'
  };

  var str = '';

  for (var k in params) {
    var v = params[k];
    str += "&" + k + "=" + v;
  }

  url = url.slice(0) + str;
  console.log(url);

  $.ajax({
    url: url,
    success: function(data) {
      var doc, idx, photos, src;

      doc = $(data);
      photos = doc.find('.photo img');
      src = photos.eq(util.choice(photos)).attr('src');
      console.log(src);

      idx = src.indexOf('.jpg') - 1;
      src = util.replace_at(src, idx, '5');
      $('.wrapper').css('background-image', "url('" + src + "')");
    },
    error: function(err) {
      console.error(err);
    }
  });
};
