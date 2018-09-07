const download = require('./downloadAssets.js');
const pkg = require('../package.json');
const fs = require('fs-extra');
const unzip = require("unzip");

console.log("Load KGrid Assets");

let urls = Object.values(pkg.githubAssets);
let requests = urls.map(
    url => download.downloadAssets(url, "dist"));

Promise.all(requests).then( function() {

  console.log("Completed KGrid Asset Load");

  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({ path: 'library/shelf' }));
  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({ path: 'activator/shelf' }));

  fs.readdir('dist', function(err, files) {

    for (var i=0; i<files.length; i++) {

      if (files[i].startsWith("kgrid-activator")){
        fs.move('dist/'+files[i], 'activator/'+files[i], function (err) {
          if (err) return console.error(err)
        })
      }
      if (files[i].startsWith("kgrid-library")){
        fs.move('dist/'+files[i], 'library/'+files[i], function (err) {
          if (err) return console.error(err)
        })
      }
    }
  });
});
