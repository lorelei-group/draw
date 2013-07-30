
install:
	cd srv; npm install
	cd web; bower install

run:
	node srv/main

lint:
	jshint .

clean:
	rm -rf srv/node_modules web/bower_components
