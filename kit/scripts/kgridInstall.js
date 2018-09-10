const download = require('./downloadAssets.js');
const pkg = require('../package.json');
const fs = require('fs-extra');
const unzip = require("unzip");

console.log("Load KGrid Assets");

let assests = Object.values(pkg.githubAssets);
let requests = assests.map(
    assest => download.downloadAssets(assest.url, assest.destination));

Promise.all(requests).then(function (values) {

  console.log("Completed KGrid Asset Load ");

  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({path: 'library/shelf'}));
  fs.createReadStream('dist/cpic-all.zip').pipe(
      unzip.Extract({path: 'activator/shelf'}));

  for (var i = 0; i < values.length; i++) {

    if (values[i].startsWith("kgrid-activator")) {
      fs.move('activator/' + values[i], 'activator/kgrid-activator.jar',
          function (err) {
            if (err) {
              return console.error(err)
            }
          })
    }
    if (values[i].startsWith("kgrid-library")) {
      fs.move('library/' + values[i], 'library/kgrid-library.jar', function (err) {
        if (err) {
          return console.error(err)
        }
      })
    }
  }



});
