#!/usr/bin/env sh

if [ ! -d "dev" ]; then
  mkdir -p dev

  artifacts=($(curl -s https://api.github.com/repos/kgrid/kgrid-activator/releases/latest | jq -r ".assets[] | .browser_download_url "))

  for url in "${artifacts[@]}"

  do
     if [[ $url = *.jar ]]
     then
        curl -Lo dev/kgrid-activator.jar $url
     fi
  done

fi

java -jar dev/kgrid-activator.jar --kgrid.shelf.cdostore.url=filesystem:file:///$PWD
