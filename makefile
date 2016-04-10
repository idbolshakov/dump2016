all:
	@node yaCards.js > .yaCards.html;
	@cat static/header.html .yaCards.html static/footer.html > build/yaCards.html;
	@rm .yaCards.html
	@cp static/style.css build/style.css;
	@echo "**** build complete"
