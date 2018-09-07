#!/usr/bin/env bash

echo "Starting KGrid CPIC Kit"

echo "Starting library on http://localhost:8081"
nohup java -jar library/kgrid-library.jar --server.port=8081 --kgrid.shelf.cdostore.url=filesystem:file://library/shelf &>/dev/null &

echo "Starting activator on http://localhost:8082"
nohup java -jar activator/kgrid-activator.jar --server.port=8082 --kgrid.shelf.cdostore.url=filesystem:file://activator/shelf &>/dev/null &

echo "Waiting....."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8081)" != "200" ]]; do sleep 5; done
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8082)" != "200" ]]; do sleep 5; done

echo "KGrid CPIC Kit is running"