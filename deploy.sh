#!/bin/sh
cd client
echo 1
npm run build
echo 2
cd ..
echo 3
git add .
echo 4
git commit -m "$1"
echo 5
git push
echo 6
git push heroku main
echo 7
