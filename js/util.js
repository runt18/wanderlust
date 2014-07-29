var replace_at = function(s, i, c) {
  return s.substr(0, i) + c + s.substr(i + c.length);
};

var choice = function(a) {
  return Math.floor(Math.random() * a.length);
};

module.exports = {
  replace_at: replace_at,
  choice: choice
};
