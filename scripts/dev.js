const fs = require('fs');
const download = require('download');
const request = require('request');
const jq = require('node-jq')
const shell = require('shelljs');
const fileExists = require('file-exists');

const filter = '.assets[].browser_download_url'
const jqOptions = { input: 'string', output: 'json'}

  var requestOptions = {
      url: 'https://api.github.com/repos/kgrid/kgrid-activator/releases/latest',
      headers: {
          'User-Agent': 'request'
      }
  };


  request(requestOptions, function (error, response, body) {
    jq.run(filter, body, jqOptions).then((output) => {

      let download_url=output;

      fileExists( download_url.substring( (download_url.lastIndexOf('/')+1) ) ).then( exists => {
        if (exists){
          console.log("already have activator");
          executeActivator();
        } else {
          console.log("downloading activator");
          download(output,".").then(() => {
            console.log('files downloaded!');
            executeActivator();
          });
        }
      });

    }).catch((err) => {
      console.error(err);
    });
  });

  function executeActivator() {
    shell.exec("java -jar kgrid-activator*.jar --kgrid.shelf.cdostore.url=filesystem:file:///"+process.cwd(),function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    });
  }








