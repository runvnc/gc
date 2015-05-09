#!/bin/bash
cd public
6to5 app.jsx > app.js
cat react.min.js app.js > main.js 
