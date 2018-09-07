const fs = require('fs-extra')

try {
  fs.removeSync('dist');
  fs.removeSync('activator');
  fs.removeSync('library');
  fs.removeSync('node_modules');
  console.log("Clean up complete");
} catch (e) {
  console.error(e);

}