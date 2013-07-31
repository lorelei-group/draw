
install: install.helper install-from-npm

install.helper: add-repos
	npm install

install-from-npm:
	cd public; ../node_modules/.bin/bower install

add-repos:
	-git remote remove heroku
	git remote add heroku git@heroku.com:lorelei-draw.git

run:
	node main

lint:
	node_modules/.bin/jshint .

clean:
	rm -rf node_modules public/bower_components
