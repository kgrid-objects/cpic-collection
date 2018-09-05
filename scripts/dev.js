const fs = require('fs');
const dev = require('download');
const request = require('request');
const jq = require('node-jq')
const shell = require('shelljs');

const filter = '.assets[].browser_download_url'
const jqOptions = { input: 'string', output: 'json'}

var options = {
    url: 'https://api.github.com/repos/kgrid/kgrid-activator/releases/latest',
    headers: {
        'User-Agent': 'request'
    }
};


request(options, function (error, response, body) {
    jq.run(filter, body, jqOptions).then((output) => {
        download_url=output
        console.log("dowloading " + output)
        dev(output,".").then(() => {
            console.log('files downloaded!');
            shell.exec("java -jar kgrid-activator*.jar --kgrid.shelf.cdostore.url=filesystem:file:///"+process.cwd(),function(code, stdout, stderr) {
                console.log('Exit code:', code);
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);
            });
        });

    }).catch((err) => {
        console.error(err)
    })
});




