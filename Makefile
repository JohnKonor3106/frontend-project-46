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

.PHONY: test
.PHONY: coverage
