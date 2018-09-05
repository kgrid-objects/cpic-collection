const fs = require('fs');
const download = require('download');
const request = require('request');
const jp = require('jsonpath');
const shell = require('shelljs');
const fileExists = require('file-exists');

const filter = '$.assets[*].browser_download_url'

  var requestOptions = {
      url: 'https://api.github.com/repos/kgrid/kgrid-activator/releases/latest',
      headers: {
          'User-Agent': 'request'
      }
  };

  request(requestOptions, function (error, response, body) {

      let download_url = jp.value(JSON.parse(body),filter);

      fileExists( download_url.substring( (download_url.lastIndexOf('/')+1) ) ).then( exists => {

        if (exists){
          console.log("already have activator");
          executeActivator();
        } else {
          console.log("downloading activator");
          download(download_url,".").then(() => {
            console.log('files downloaded!');
            executeActivator();
          });
        }
      });

  });

  function executeActivator() {
    shell.exec("java -jar kgrid-activator*.jar --kgrid.shelf.cdostore.url=filesystem:file:///"+process.cwd(),function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    });
  }








