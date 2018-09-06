const download = require('./downloadAssets.js');
const fs = require('fs');
const unzip = require("unzip");

var options = {
  url: 'https://api.github.com/repos/kgrid-objects/cpic-objects/releases/latest',
  headers: {
    'User-Agent': 'request'
  }
};

console.log("Load CPIC Knowledge Objects");
try {
  fs.unlinkSync('dist/cpic-all.zip');
} catch (e) {
  //eat file not found
}


let cpicKODownload = download.downloadAssets(options, "dist");

cpicKODownload.then( function(values) {

  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({ path: 'library/shelf' }));
  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({ path: 'activator/shelf' }));

  console.log("CPIC Knowledge Objects loaded to shelf");
});