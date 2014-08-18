var util = require('./util');

module.exports = function(city) {
  var url = 'http://500px.com/search?';

  var params = {
    page: 1,
    q: city,
    type: 'photos',
    category: 'City+%26+Architecture',
    order: 'rating',
    // Filter by Creative Commons Attribution 2.0 Generic licensed photos
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

      window.doc = doc;

      var containers = doc.find('.photo');
      var container = containers.eq(util.choice(containers));
      var src = container.find('img').attr('src');
      var title = container.find('.title').text();
      var author = container.find('.info').text();

      var photoLink = 'http://500px.com' + container.find('.title a').attr('href');
      var authorLink = 'http://500px.com' + container.find('.info a').attr('href');

      idx = src.indexOf('.jpg') - 1;
      src = util.replace_at(src, idx, '5');

      $('.wrapper').css('background-image', "url('" + src + "')");
      $('.title').attr('href', photoLink).text(title);
      $('.author').attr('href', authorLink).text(author);
    },
    error: function(err) {
      console.error(err);
    }
  });
};
