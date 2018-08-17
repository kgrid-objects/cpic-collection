var fs = require('fs-extra')
var file = 'payload.js'
fs.createFile(file, function(err) {
  console.log(err); //null
  //file has now been created, including the directory it is to be placed in
})
fs.writeFile("payload.js", "\n"
+ "function getphenotype (inputs) {" + "\n"
+ "var list = {'*3-*3':2,'*3-*3xN':2,'*3-*4':2}" , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
fs.writeFile("payload.js", "var list = {'*3-*3':2,'*3-*3xN':2,'*3-*4':2}", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

//console.info("bbb");
