all:
	@node yaCards.js > build/yaCards.html;
	@cp static/style.css build/style.css;
	@echo "**** build complete"
