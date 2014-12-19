BIN=./node_modules/.bin

dist:
	@$(BIN)/browserify index.js -s ndpane -o dist/ndpane.js
	@$(BIN)/uglifyjs dist/ndpane.js --mangle -c hoist_vars=true,if_return=true -o dist/ndpane.min.js --source-map dist/ndpane.min.map --source-map-include-sources

.PHONY: dist