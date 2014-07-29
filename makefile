.PHONY: deploy site clean install chrome

BROWSERIFY = ./node_modules/.bin/browserify
SERVE = ./node_modules/.bin/serve
STYLUS = ./node_modules/.bin/stylus

PORT = 1234

SITE = site

VENDOR = \
	vendor/bootstrap/dist/css/bootstrap.css \
	vendor/font-awesome/css/font-awesome.css \
	vendor/font-awesome/fonts \
	vendor/jquery/dist/jquery.js \
	vendor/geolib/dist/geolib.js \
	vendor/gmaps/gmaps.js

site:
	mkdir -p $(SITE)
	rsync -Rr index.html favicon.png image/logo.png $(VENDOR) $(SITE)
	$(BROWSERIFY) js/main.js > site/all.js
	$(STYLUS) --use ./node_modules/nib stylus/style.styl -o site

chrome:
	rsync -Rr index.html $(VENDOR) extension
	$(BROWSERIFY) js/main.js > extension/all.js
	$(STYLUS) --use ./node_modules/nib stylus/style.styl -o extension

deploy: site
	s3cmd sync $(SITE)/ s3://away.io --acl-public

clean:
	rm -rf $(SITE)

install:
	npm install
	bower install

serve:
	serve -p $(PORT) site > /dev/null
