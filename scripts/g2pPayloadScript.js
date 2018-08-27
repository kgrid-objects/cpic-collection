var fs = require('fs-extra')
var file = 'payload.js'
var infile = 'CYP2D6_table.tsv'
var fl = require ('firstline')
var lineone = fl(infile)
function findCol1(element){
  return (element = 'Diplotype')
}

lineone.then(function(result) {
   console.log(result) //will log results.
   var lineoneArr = result.split('\t')
   var c1 = lineoneArr.findIndex(findCol1)
   
    console.log(c1)
})
var lineReader = require('readline').createInterface({
 input: require('fs').createReadStream(infile)
});

//lineReader.on('line', function (line) {
// console.log('Line from file:', line);
//});
fs.createFile(file, function(err) {
  console.log(err); //null
  //file has now been created, including the directory it is to be placed in
})
fs.writeFile("payload.js", "\n" + ""
+ "function getphenotype (inputs) {" + "\n"
+"var diplotype = ''" +"\n"
+"var output = {'enzym': 'CYP2D6', 'phenotype': ''}" + "\n"
+"try {" + "\n"
  + "var enzym = inputs.enzym || ''" + "\n"
  + "var a1 = inputs['allele1'] || ''" + "\n"
  + "var a2 = inputs['allele2'] || ''" + "\n"
  + "if ((enzym != '') && (a1 != '') && (a2 != '')) {" + "\n"
  + " if (enzym == output.enzym) {" + "\n"
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
  +"return 'Expecting ' + output.enzym + ' as enzym input for this KO.'" + "\n"
  +"}" + "\n"
+"} else {" + "\n"
+  "return 'Invalid Input'" + "\n"
+"}" + "\n"
+"} catch (error) {" + "\n"
+"return 'Error'" + "\n"
+"}" + "\n"
+"}" + "\n"
+"var dict=['TBD','Likely Poor','Poor','Likely Intermediate','Intermediate','Normal','Rapid','Ultrarapid']" + "\n"

+ "var list = {'*3-*3':2,'*3-*3xN':2,'*3-*4':2}" , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});


//console.info("bbb");
