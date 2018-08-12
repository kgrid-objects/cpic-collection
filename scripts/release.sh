#!/usr/bin/env sh

rm -rf dist
mkdir -p dist &&
cp -rf 99999-2d6codeine dist/99999-2d6codeine &&
cp -rf 99999-2d6genopheno dist/99999-2d6genopheno &&
cd dist
zip -r -X cpic-all.zip * -x \"*.DS_Store\"