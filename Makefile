# @desandro only

zip:
	rm -rf build/masonry-docs.zip
	cp -r build masonry-docs
	zip -rq build/masonry-docs.zip masonry-docs/
	rm -rf masonry-docs

deploy:
	s3cmd -c ~/.s3cfg-desandro sync build/. s3://masonry.desandro.com

grunt:
	grunt

grunt-dev:
	grunt --dev

prod: grunt-dev zip grunt deploy
