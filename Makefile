# @desandro only

zip:
	cp -r build masonry-docs
	zip -rq build/masonry-docs.zip masonry-docs/
	rm -rf masonry-docs

deploy:
	rsync -avz build/ ${BERNA}:~/subdomains/masonry.desandro.com/

grunt:
	grunt

grunt-dev:
	grunt --dev

prod: grunt-dev zip grunt deploy
