#!/usr/bin/env sh

for dir in collection/*
  echo "$dir"
  do (cd "$dir" && kgrid package && cd ..)
done
