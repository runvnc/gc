#!/bin/bash
BIN=$(npm bin)
cd public
$BIN/6to5 app.jsx > app.js
$BIN/uglifyjs app.js > app.min.js
cat simplewebrtc.min.js react.js app.min.js > main.js
cd ..
