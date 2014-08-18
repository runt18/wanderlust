.PHONY: deploy site clean install chrome test zip render

BIN = ./node_modules/.bin

BROWSERIFY = $(BIN)/browserify
SERVE = $(BIN)/serve
STYLUS = $(BIN)/stylus
MOCHA = $(BIN)/mocha

PORT = 1234

SITE = site

RENDERMODE = web

VENDOR = \
	vendor/bootstrap/dist/css/bootstrap.css \
	vendor/font-awesome/css/font-awesome.css \
	vendor/font-awesome/fonts \
	vendor/jquery/dist/jquery.js \
	vendor/geolib/dist/geolib.js \

site: webicons render
	mkdir -p $(SITE)
	rsync -Rr image/logo.png $(VENDOR) $(SITE)
	$(BROWSERIFY) js/main.js > site/all.js
	$(STYLUS) --use ./node_modules/nib stylus/style.styl -o site

chrome: chromeicons
	rsync -Rr index.html $(VENDOR) extension
	$(BROWSERIFY) js/main.js > extension/all.js
	$(STYLUS) --use ./node_modules/nib stylus/style.styl -o extension

deploy: site
	s3cmd sync $(SITE)/ s3://away.io --acl-public

clean:
	rm -rf $(SITE) extension/icons extension/vendor extension/all.js extension/index.html extension/style.css

install:
	npm install
	bower install

serve:
	serve -p $(PORT) site > /dev/null

webicons:
	mkdir -p site
	convert -resize x16 image/logo.png site/favicon.png

chromeicons:
	mkdir -p extension/icons
	convert -resize x128 image/logo.png extension/icons/128.png
	convert -resize x48 image/logo.png extension/icons/48.png
	convert -resize x16 image/logo.png extension/icons/16.png

test:
	$(MOCHA)

zip:
	zip -r wanderlust.zip extension

render:
	node tools/render.js $(RENDERMODE)
