#!/usr/bin/env sh

if [ ! -f kgrid-activator*.jar ]; then

  artifacts=($(download https://api.github.com/repos/kgrid/kgrid-activator/releases/latest >&1 | jq -r ".assets[] | .browser_download_url "))

  echo fetched browser_download_url... ${artifacts}

  for url in "${artifacts[@]}"

  do
     if [[ ${url} = *.jar ]]
     then
        echo downloading jar file ${url}
        download ${url} > kgrid-activator.jar
     fi
  done

fi

java -jar kgrid-activator.jar --kgrid.shelf.cdostore.url=filesystem:file:///$PWD
