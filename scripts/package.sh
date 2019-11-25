#!/usr/bin/env sh

for dir in collection/* ;
  do (cd "$dir" && kgrid package && cd ..)
done
