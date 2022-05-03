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
echo "NOTE: pushing branch v1StableUpdates to deploy!"
git push heroku v1StableUpdates:main
echo 7
