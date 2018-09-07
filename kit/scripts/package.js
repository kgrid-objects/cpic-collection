const AdmZip  = require('adm-zip');
const stat = require('fs').statSync;

const zip = new AdmZip();
const pathNames =
  [
    'package.json',
    'package-lock.json',
    'scripts'
  ];

pathNames.forEach(path => {
  const p = stat(path);
  if (p.isFile()) {
    zip.addLocalFile(path);
  } else if (p.isDirectory()) {
    zip.addLocalFolder(path, path);
  }
});

zip.writeZip("cpic-kit.zip");