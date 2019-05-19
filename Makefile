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
	git commit -m sync
	git push gendiff master
test:
	npm run build
	npm test
