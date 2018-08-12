#!/usr/bin/env sh

# Setup
rm -rf dist
mkdir -p dist
cp -r 99999-* dist

# create zip for each ko
cd dist
for d in * ; do
    echo "$d.zip"
    zip -r -X "$d.zip" $d -x \"*.DS_Store\"
done

# clean up only leaving zip files
rm -r */