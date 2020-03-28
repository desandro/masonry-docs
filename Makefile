# @desandro only

zip:
	rm -rf build/masonry-docs.zip
	cp -r build masonry-docs
	zip -rq build/masonry-docs.zip masonry-docs/
	rm -rf masonry-docs

deploy:
	netlify deploy --dir=build

gulp:
	gulp

gulp-export:
	rm -rf build/
	gulp export
	make zip

prod: gulp-export gulp deploy
