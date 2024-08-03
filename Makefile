install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint . --fix
	
test:
	npm test

coverage:
	npm run coverage

record:
	asciinema rec demo.cast
	
delete:
	rm demo.cast

upload:
	asciinema upload demo.cast

play:
	asciinema play demo.cast

.PHONY: test
.PHONY: coverage
