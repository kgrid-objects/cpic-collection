#!/usr/bin/env sh

if [ ! -d "dev" ]; then
  echo creating dev directory...
  mkdir -p dev
fi

if [ ! -f dev/kgrid-activator*.jar ]; then

  artifacts=($(curl -s https://api.github.com/repos/kgrid/kgrid-activator/releases/latest | jq -r ".assets[] | .browser_download_url "))

  for url in "${artifacts[@]}"

  do
     if [[ $url = *.jar ]]
     then
        echo downloading jar file $url ...
        curl -Lo dev/kgrid-activator.jar $url
     fi
  done

fi

java -jar dev/kgrid-activator.jar --kgrid.shelf.cdostore.url=filesystem:file:///$PWD
