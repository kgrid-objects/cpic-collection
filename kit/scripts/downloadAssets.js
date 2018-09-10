
const download = require('download');
const request = require('request');
const jp = require('jsonpath');
const fileExists = require('file-exists');

const filter = '$.assets[*].browser_download_url'

module.exports = {

  downloadAssets: function(url, location){

    var options = {
      url: url+"/releases/latest",
      headers: {
        'User-Agent': 'request'
      }
    };

    return new Promise( (resolve, reject) => {

      request(options, function (error, response, body) {
        if (error){
          reject(error);
        } else {
          let download_url = jp.value(JSON.parse(body), filter);
          let filename = download_url.substring(
              (download_url.lastIndexOf('/') + 1));
          fileExists(location + "/" + filename).then(exists => {
            if (exists) {
              console.log("Already have " + filename);
              resolve(filename);
            } else {
              console.log("Downloading " + filename);
              download(download_url, location, "{'extract':true}").then(() => {
                console.log(filename + ' downloaded to '+location);
                resolve(filename);
              });
            }
          });
        }
      });

    });

 }

};