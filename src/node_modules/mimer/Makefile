SHELL = /bin/sh
NPM   = npm
NODE  = node

install:
	$(NPM) install
test: lint spec
fulltest: clean install test
clean:
	rm -rf node_modules
lint:
	./node_modules/.bin/jshint mimer.js lib/*
spec:
	@echo "Running test suite..."
	$(NODE) test/run.js
.PHONY: test fulltest clean lint
