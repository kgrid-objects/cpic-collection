
function getphenotype (inputs) {
var diplotype = ''
var output = {'enzym': 'CYP2D6', 'phenotype': ''}
try {
var enzym = inputs.enzym || ''
var a1 = inputs['allele1'] || ''
var a2 = inputs['allele2'] || ''
if ((enzym != '') && (a1 != '') && (a2 != '')) {
 if (enzym == output.enzym) {
diplotype = a1 + '-' + a2
var index = list[diplotype]
if (index == null) {
diplotype = a2 + '-' + a1
index = list[diplotype]
} 
if (index == null) {
output.phenotype = 'Unknown'
} else {
if (index == 0) {
output.phenotype = dict[0]
 } else {
output.phenotype = dict[index] + ' metabolizer' }
}
return output
} else {
return 'Expecting ' + output.enzym + ' as enzym input for this KO.'
}
} else {
return 'Invalid Input'
}
} catch (error) {
return 'Error'
}
}
var dict=['TBD','Likely Poor','Poor','Likely Intermediate','Intermediate','Normal','Rapid','Ultrarapid']
var list = {'*3-*3':2,'*3-*3xN':2,'*3-*4':2}