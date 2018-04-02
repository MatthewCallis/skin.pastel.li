# skin.pastel.li
Ableton Live Skin Editor

Useful commands:
```javascript
document.querySelectorAll('input[type=color]').forEach((input) => { input.value = '#000000' })
document.querySelectorAll('input[type=range]').forEach((input) => { input.value = 255 })
```

## Building

See `package` scripts.

```
"autoprefixer": "postcss style.css --use autoprefixer -d style.css",
"local-web-server": "ruby -run -e httpd . -p 8181",
"make": "rollup --config rollup.config.js",
"make-watch": "rollup --config rollup.config.js --watch",
"test-watch": "npm test -- --watch",
"test": "NODE_ENV=test nyc ava",
"sass": "node-sass --output-style compressed style.scss style.css",
"sass-watch": "node-sass --watch --output-style compressed style.scss style.css",
```
