var fsextra = require('fs-extra')
var file = 'payload.js'
var infile = 'CYP2D6_table.tsv'
var fl = require ('firstline') //'firstline'
var lineone = fl(infile)
var list = {}
var dict = []


lineone.then(function(result) {
   console.log(result) //will log results.
  var lineoneArr = result.split('\t')
  var c1 = lineoneArr.indexOf("CYP2D6 Diplotype")
  var c2 = lineoneArr.indexOf("Coded Genotype/Phenotype Summary")

    console.log(c1)
    console.log(c2)
    processFile('CYP2D6_table.tsv', c1, c2)
})
var lineReader = require('readline').createInterface({
 input: require('fs').createReadStream(infile)
})


function processFile(inputFile,c1,c2) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

     rl.on('line', function (line) {
      var lineArr = line.split('\t')

      var line1 = lineArr[c1].replace('/', '-')


        //list[line1]= lineArr[c2]
      var line2 = lineArr[c2].replace('CYP2D6 Poor Metabolizer','2').replace('CYP2D6 Intermediate Metabolizer','4').replace('CYP2D6 Normal Metabolizer','5').replace('CYP2D6 Ultrarapid Metabolizer','7').replace('Indeterminate','4')

      //var line2= lineArr[c2].replace('CYP2D6 Intermediate Metabolizer','4')
       list[line1]= line2
    //var line3= lineArr[c2].replace('CYP2D6 Intermediate Metabolizer','4')
      //  list[line1]= line2
      //  list[line1]= line3
    })




    rl.on('close', function (line) {


//lineReader.on('line', function (line) {
// console.log('Line from file:', line);
//});
fsextra.createFile(file, function(err) {
  console.log(err); //null
  //file has now been created, including the directory it is to be placed in
})
fsextra.writeFile("payload.js", "\n" + ""
+ "function getphenotype (inputs) {" + "\n"
+"var diplotype = ''" +"\n"
+"var output = {'enzyme': 'CYP2D6', 'phenotype': ''}" + "\n"
+"try {" + "\n"
  + "var enzyme = inputs.enzyme || ''" + "\n"
  + "var a1 = inputs['allele1'] || ''" + "\n"
  + "var a2 = inputs['allele2'] || ''" + "\n"
  + "if ((enzyme != '') && (a1 != '') && (a2 != '')) {" + "\n"
  + " if (enzyme == output.enzyme) {" + "\n"
  +    "diplotype = a1 + '-' + a2" + "\n"
  +    "var index = list[diplotype]" + "\n"
  +    "if (index == null) {" + "\n"
  +      "diplotype = a2 + '-' + a1" + "\n"
  +      "index = list[diplotype]" + "\n"
  +   "} "+ "\n"
  + "if (index == null) {" + "\n"
  +  "output.phenotype = 'Unknown'" + "\n"
  +"} else {" + "\n"
  +  "if (index == 0) {" + "\n"
  +    "output.phenotype = dict[0]" + "\n"
  + " } else {" + "\n"
  +    "output.phenotype = dict[index] + ' metabolizer'"
  + " }" + "\n"
  +"}" + "\n"
  +"return output" + "\n"
  +"} else {" + "\n"
  +"return 'Expecting ' + output.enzyme + ' as enzyme input for this KO.'" + "\n"
  +"}" + "\n"
+"} else {" + "\n"
+  "return 'Invalid Input'" + "\n"
+"}" + "\n"
+"} catch (error) {" + "\n"
+"return 'Error'" + "\n"
+"}" + "\n"
+"}" + "\n"
+"var dict = ['TBD','Likely Poor','Poor','Likely Intermediate','Intermediate','Normal','Rapid','Ultrarapid']" +  "\n"

+ "var list ="+ JSON.stringify(list) , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})

console.log('done reading file.')
})

}


//console.info("bbb");
