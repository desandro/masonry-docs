# @desandro only

zip:
	rm -rf build/masonry-docs.zip
	cp -r build masonry-docs
	zip -rq build/masonry-docs.zip masonry-docs/
	rm -rf masonry-docs

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync --cf-invalidate build/. s3://masonry.desandro.com

gulp:
	gulp

gulp-export:
	rm -rf build/
	gulp export
	make zip

prod: gulp-export gulp deploy
