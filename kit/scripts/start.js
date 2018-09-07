const fs = require('fs-extra');
const shell = require('shelljs');


// Run external tool synchronously
if (shell.exec(' java -jar library/kgrid-library*.jar --server.port=8081 --kgrid.shelf.cdostore.url=filesystem:file://library/shelf ').code !== 0) {
  shell.echo('Error: starting library failed');
  shell.exit(1);
}