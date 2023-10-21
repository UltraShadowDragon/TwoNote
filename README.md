1. Setup Firebase

https://www.youtube.com/watch?v=rQvOAnNvcNQ&list=PLl-K7zZEsYLnfwBe4WgEw9ao0J0N1LYDR

npm init
npm install firebase

npm i webpack webpack-cli -D
node_modules/.bin/webpack --entry ./src/index.js -o dist

Use below script src in html-
<script src="./dist/main.js"></script>

npm uninstall -g serve 
npm i -S serve
npx serve

See that main.js is unreadable in Sources, let's make it readable so we can debug
Add webpack.config.js

node_modules/.bin/webpack

Update to below script src in html-
<script src="./dist/bundle.js"></script>

npx serve


Save and retrieve data from DB

https://www.youtube.com/watch?v=pP7quzFmWBY