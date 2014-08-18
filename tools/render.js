var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var mode = process.argv[2];

var filename = 'index.html';

if (['web', 'chrome'].indexOf(mode) === -1) {
  console.log('Please choose either `web` or `chrome` render target');
  process.exit(1);
}

var html = fs.readFileSync(path.resolve(__dirname, '..', filename), 'utf-8');

var isWeb = mode === 'web';

var chrome = {
  title: 'New Tab',
  isWeb: false
};

var web = {
  title: 'Wanderlust',
  isWeb: true
};

var outDir = isWeb ? 'site' : 'extension';
var out = outDir + '/' + filename;
var data = isWeb ? web : chrome;

var rendered = _.template(html, data);

fs.writeFileSync(out, rendered);

console.log('Rendered successfully');
