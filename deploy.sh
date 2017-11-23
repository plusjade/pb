#!/bin/sh

local BUCKET="www.positivebuddy.com"

echo "Trying yarn build..."
yarn build

echo "Syncing static assets..."
aws s3 sync build/static/. s3://${BUCKET}/static/

echo "syncing the homepage..."
aws s3 cp build/index.html s3://${BUCKET}/index.html --cache-control "public, must-revalidate, proxy-revalidate, max-age=0"

echo "DONE!"
