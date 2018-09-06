
const download = require('download');
const request = require('request');
const jp = require('jsonpath');
const fileExists = require('file-exists');

const filter = '$.assets[*].browser_download_url'

module.exports = {

  downloadAssets: function(options, location){

    return new Promise(function(resolve, reject) {

      request(options, function (error, response, body) {
        if (error){
          reject(error);
        } else {
          let download_url = jp.value(JSON.parse(body), filter);
          let filename = download_url.substring(
              (download_url.lastIndexOf('/') + 1));
          console.log("Download " + filename);
          fileExists(location + "/" + filename).then(exists => {
            if (exists) {
              console.log("Already have " + filename);
              resolve();
            } else {
              console.log("Downloading " + filename);
              download(download_url, location, "{'extract':true}").then(() => {
                console.log(filename + ' downloaded!');
                resolve();
              });
            }
          });
        }
      });
    })

 }

};