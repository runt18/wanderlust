.PHONY: deploy rsync clean

rsync:
	mkdir -p site
	rsync -Rr \
		index.html favicon.png js image \
		vendor/bootstrap/dist/css/bootstrap.css \
		vendor/font-awesome/css/font-awesome.css \
		vendor/font-awesome/fonts \
		vendor/jquery/dist/jquery.js \
		vendor/geolib/dist/geolib.js \
		vendor/gmaps/gmaps.js \
		\
		site

deploy: rsync
	s3cmd sync site/ s3://away.io --acl-public

clean:
	rm -rf site
