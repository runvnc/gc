#!/bin/bash
BIN=$(npm bin)
cd public
$BIN/6to5 app.jsx > app.js
$BIN/uglifyjs app.js > app.min.js
cat simplewebrtc.js react.min.js app.min.js > main.js
cd ..
