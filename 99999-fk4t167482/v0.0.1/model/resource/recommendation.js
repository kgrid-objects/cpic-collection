function dosingrecommendation (inputs) {
  try {
    var phenotypesReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in genes){
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      phenotypesReady = phenotypesReady && (genes[genekey].phenotype!='')
      if(phenotypesValue!=''){
        phenotypesValue = phenotypesValue+' '
      }
      phenotypesValue =phenotypesValue + genekey+ " "+genes[genekey].phenotype
    }
    if (phenotypesReady) {
      var searchKey = ''
      for( var key in keymap){
        if(keymap[key].toLowerCase()==phenotypesValue.toLowerCase()){
          searchKey = key
          break
        }
      }
      if(recommendations[searchKey]!=null){
        output["genes"] = JSON.parse(JSON.stringify(genes))
        output.recommendation.implication=recommendations[searchKey].implication
        output.recommendation.content=recommendations[searchKey].recommendation
        output.recommendation.classification=recommendations[searchKey].classification
        return output
      } else {
        return "Incorrect/invalid input for drug " + drug
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines CYP2C19 and CYP2D6 Phenotypes to amitriptyline Recommendation
var genes = {'CYP2C19':{},'CYP2D6':{}}
var drug = 'amitriptyline'
var keymap = {'cyp2c19ultrarapidcyp2d6ultrarapid':'CYP2C19 Ultrarapid metabolizer CYP2D6 Ultrarapid metabolizer',
"cyp2c19ultrarapidcyp2d6normal":'CYP2C19 Ultrarapid metabolizer CYP2D6 Normal metabolizer',
"cyp2c19ultrarapidcyp2d6intermediate":"CYP2C19 Ultrarapid metabolizer CYP2D6 Intermediate metabolizer",
"cyp2c19ultrarapidcyp2d6poor":"CYP2C19 Ultrarapid metabolizer CYP2D6 Poor metabolizer",

'cyp2c19rapidcyp2d6ultrarapid':'CYP2C19 Rapid metabolizer CYP2D6 Ultrarapid metabolizer',
"cyp2c19rapidcyp2d6normal":'CYP2C19 Rapid metabolizer CYP2D6 Normal metabolizer',
"cyp2c19rapidcyp2d6intermediate":"CYP2C19 Rapid metabolizer CYP2D6 Intermediate metabolizer",
"cyp2c19rapidcyp2d6poor":"CYP2C19 Rapid metabolizer CYP2D6 Poor metabolizer",

'cyp2c19normalcyp2d6ultrarapid':'CYP2C19 Normal metabolizer CYP2D6 Ultrarapid metabolizer',
"cyp2c19normalcyp2d6normal":'CYP2C19 Normal metabolizer CYP2D6 Normal metabolizer',
"cyp2c19normalcyp2d6intermediate":"CYP2C19 Normal metabolizer CYP2D6 Intermediate metabolizer",
"cyp2c19normalcyp2d6poor":"CYP2C19 Normal metabolizer CYP2D6 Poor metabolizer",

'cyp2c19intermediatecyp2d6ultrarapid':'CYP2C19 Intermediate metabolizer CYP2D6 Ultrarapid metabolizer',
"cyp2c19intermediatecyp2d6normal":'CYP2C19 Intermediate metabolizer CYP2D6 Normal metabolizer',
"cyp2c19intermediatecyp2d6intermediate":"CYP2C19 Intermediate metabolizer CYP2D6 Intermediate metabolizer",
"cyp2c19intermediatecyp2d6poor":"CYP2C19 Intermediate metabolizer CYP2D6 Poor metabolizer",

'cyp2c19poorcyp2d6ultrarapid':'CYP2C19 Poor metabolizer CYP2D6 Ultrarapid metabolizer',
"cyp2c19poorcyp2d6normal":'CYP2C19 Poor metabolizer CYP2D6 Normal metabolizer',
"cyp2c19poorcyp2d6intermediate":"CYP2C19 Poor metabolizer CYP2D6 Intermediate metabolizer",
"cyp2c19poorcyp2d6poor":"CYP2C19 Poor metabolizer CYP2D6 Poor metabolizer"
}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"amitriptyline","genes":{"CYP2C19":{},"CYP2D6":{}}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {'cyp2c19ultrarapidcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6normal":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},

'cyp2c19rapidcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6normal":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},

'cyp2c19normalcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider titrating to a higher target dose (compared to normal metabolizers)',
        'classification': 'Strong'},
"cyp2c19normalcyp2d6normal":{'implication': '',
        'recommendation': 'Initiate therapy with recommended starting dose',
        'classification': 'Strong'},
"cyp2c19normalcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider a 25% reduction of recommended starting dose',
        'classification': 'Moderate'},
"cyp2c19normalcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose',
        'classification': 'Strong'},

'cyp2c19intermediatecyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use.',
        'classification': 'Optional'},
"cyp2c19intermediatecyp2d6normal":{'implication': '',
        'recommendation': 'Initiate therapy with recommended starting dose',
        'classification': 'Strong'},
"cyp2c19intermediatecyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider a 25% reduction of recommended starting dose',
        'classification': 'Optional'},
"cyp2c19intermediatecyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose.',
        'classification': 'Optional'},

'cyp2c19poorcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19poorcyp2d6normal":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose',
        'classification': 'Moderate'},
"cyp2c19poorcyp2d6intermediate":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19poorcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'}
}
