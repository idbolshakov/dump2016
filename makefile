all:
	@node yaCards.js > .yaCards.html;
	@cat static/header.html .yaCards.html static/footer.html > build/yaCards.html;
	@rm .yaCards.html
	
	@cp static/style.css build/style.css;
	
	@mkdir -p build/images/
	@cp static/suits/club.svg    build/images/club.svg
	@cp static/suits/diamond.svg build/images/diamond.svg
	@cp static/suits/heart.svg   build/images/heart.svg
	@cp static/suits/spark.svg   build/images/spark.svg
	
	@echo "**** build complete"
