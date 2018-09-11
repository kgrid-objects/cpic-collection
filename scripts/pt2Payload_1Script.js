var fsextra = require('fs-extra')
var file = 'payload_1.js'
var infile = 'CYP2C19_table.tsv'
var fl = require ('firstline') //'firstline'
var lineone = fl(infile)
var list = {}
var dict = []


lineone.then(function(result) {
   console.log(result) //will log results.
  var lineoneArr = result.split('\t')
  var c1 = lineoneArr.indexOf("CYP2C19 Diplotype")
  var c2 = lineoneArr.indexOf("Coded Diplotype/Phenotype Summarya")

    console.log(c1)
    console.log(c2)
    processFile('CYP2C19_table.tsv', c1, c2)
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

      var line1 = lineArr[c1]


    var line2 = lineArr[c2].replace('CYP2C19 Poor Metabolizer', '1').replace('CYP2C19 Likely Poor Metabolizer','2').replace('CYP2C19 Likely Intermediate Metabolizer', '3').replace('CYP2C19 Intermediate Metabolizer','4').replace('CYP2C19 Normal Metabolizer','5').replace('CYP2C19 Ultrarapid Metabolizer','7').replace('CYP2C19 Rapid Metabolizer','6').replace('Indeterminate', '0')

      list[line1]= line2
    //  list[line1] = lineArr[c2]
      delete list['CYP2C19 Diplotype']
      delete list ['aThe coded diplotype/phenotype summary is used to store an interpretation of the test result.  This is a design decision that may differ among sites']
      delete list ['bA priority result is defined as a genetic test result that results in a change in drug, drug dose, or drug monitoring']
    })


    rl.on('close', function (line) {



fsextra.createFile(file, function(err) {
  console.log(err); //null
  //file has now been created, including the directory it is to be placed in
})
fsextra.writeFile("payload_1.js", "\n" + ""
+ "function phenotype (inputs) {" + "\n"
+ "var output = {}" + "\n"
+ "try {" + "\n"
+ "var diplotype = inputs[gene]" + "\n"
+ "var index = list[diplotype]"  + "\n"
+ "if (index == null) {" +"\n"
+ " output[gene] = 'Unknown'"   + "\n"
+ "} else {" + "\n"
+ "if (index == 0) {" + "\n"
+ "output[gene] = dict[0]" + "\n"
+ "} else {" + "\n"
+ "output[gene] = dict[index] + ' metabolizer'" + "\n"
+ "   }" + "\n"
+ "}" + "\n"
+ "return output" + "\n"
+ "} catch (error) {" + "\n"
+ "  return 'Error ' + error" + "\n"
+ " }" + "\n"
+ "    }" + "\n"
+ "var gene = 'CYP2C19'" + "\n"
+ "var dict = ['TBD', 'Poor', 'Likely Poor',  'Likely Intermediate', 'Intermediate', 'Normal', 'Rapid', 'Ultrarapid']" + "\n"
+ "var list ="+ JSON.stringify(list) , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})

console.log('done reading file.')
})

}
