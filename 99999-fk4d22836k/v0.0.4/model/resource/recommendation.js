function dosingrecommendation (inputs) {
  try {
    var phenotypesReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in phenotypes){
      key = genekey.toLowerCase()
      phenotypes[genekey] = lowercaseInput[key] || ''
      phenotypes[genekey] = phenotypes[genekey].toLowerCase()
      phenotypesReady = phenotypesReady && (phenotypes[genekey]!='')
      if(phenotypesValue!=''){
        phenotypesValue = phenotypesValue+' '
      }
      phenotypesValue =phenotypesValue + genekey+ " "+phenotypes[genekey]
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
        output["phenotypes"] = JSON.parse(JSON.stringify(phenotypes))
        output.recommendation.implication=recommendations[searchKey].implication
        output.recommendation.content=recommendations[searchKey].recommendation
        output.recommendation.classification=recommendations[searchKey].classification
        return output
      } else {
        return "Incorrect/invalid input for phenotype."
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines CYP2C19 Phenotype to citalopram and escitalopram Recommendation
var phenotypes = {'CYP2C19':''}
var drug = 'Citalopram and Escitalopram'
var keymap = {'cyp2c19ultrarapid':'CYP2C19 Ultrarapid metabolizer',"cyp2c19normal":'CYP2C19 Normal metabolizer',"cyp2c19intermediate":"CYP2C19 Intermediate metabolizer","cyp2c19poor":"CYP2C19 Poor metabolizer"}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"Citalopram and Escitalopram","phenotypes":{"CYP2C19":""}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'cyp2c19ultrarapid': {'implication': 'Increased metabolism when compared to extensive metabolizers. Lower plasma concentrations will increase probability of pharmacotherapy failure.',
          'recommendation': 'Consider an alternative drug not predominantly metabolized by CYP2C19.',
          'classification': 'Moderate'},
  'cyp2c19normal': {'implication': 'Normal metabolism',
          'recommendation': 'Initiate therapy with recommended starting dose.',
          'classification': 'Strong'},
  'cyp2c19intermediate': {'implication': 'Reduced metabolism when compared to extensive metabolizers.',
          'recommendation': 'Initiate therapy with recommended starting dose.',
          'classification': 'Strong'},
  'cyp2c19poor': {'implication': 'Greatly reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.',
          'recommendation': 'Consider a 50% reduction of recommended starting dose and titrate to response or select alternative drug not predominantly metabolized by CYP2C19',
          'classification': 'Moderate'}}
