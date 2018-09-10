const AdmZip  = require('adm-zip');
const fs = require('fs');

const zip = new AdmZip();
const pathNames =
  [
    'package.json',
    'package-lock.json',
    'scripts',
    'web'
  ];


if (!fs.existsSync('dist')){
  fs.mkdirSync('dist');
}

pathNames.forEach(path => {
  const p = fs.statSync(path);
  if (p.isFile()) {
    zip.addLocalFile(path);
  } else if (p.isDirectory()) {
    zip.addLocalFolder(path, path);
  }
});

zip.writeZip("dist/cpic-kit.zip");