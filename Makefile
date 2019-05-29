install:
	npm install
start:
	npx babel-node 'src/bin/gendiff.js' 10
publish:
	npm publish
lint:
	npx eslint .
test:
	npm run build
	npm test
