install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npm run eslint .
git:
	git add .
	git commit -m changes
	git push
test:
	npm test
