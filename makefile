.PHONY: deploy site clean install chrome

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
	rsync -Rr index.html favicon.png js image $(VENDOR) $(SITE)

chrome:
	rsync -Rr index.html js image $(VENDOR) extension

deploy: site
	s3cmd sync $(SITE)/ s3://away.io --acl-public

clean:
	rm -rf $(SITE)

install:
	npm install
	bower install
