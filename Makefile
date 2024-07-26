install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .
	
test:
	npm test

coverage:
	npm run coverage

.PHONY: test
.PHONY: coverage
