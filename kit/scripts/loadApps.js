const download = require('./downloadAssets.js');

var activatorOptions = {
  url: 'https://api.github.com/repos/kgrid/kgrid-activator/releases/latest',
  headers: {
    'User-Agent': 'request'
  }
};

var libraryOptions = {
  url: 'https://api.github.com/repos/kgrid/kgrid-library/releases/latest',
  headers: {
    'User-Agent': 'request'
  }
};
console.log("Load KGrid Applications");
let activatorDownload = download.downloadAssets(activatorOptions, "activator");
let libraryDownload  = download.downloadAssets(libraryOptions, "library");
Promise.all([activatorDownload, libraryDownload]).then(function(values) {
  console.log("KGrid Applications in place");
});

