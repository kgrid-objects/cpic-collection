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

// KGrid CPIC guidelines CYP2C19 Phenotype to Clopidogrel Recommendation
var genes = {'CYP2C19':{}}
var drug = 'clopidogrel'
var keymap = {'cyp2c19ultrarapid':'CYP2C19 Ultrarapid metabolizer',"cyp2c19normal":'CYP2C19 Normal metabolizer',"cyp2c19intermediate":"CYP2C19 Intermediate metabolizer","cyp2c19poor":"CYP2C19 Poor metabolizer"}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"clopidogrel","genes":{"CYP2C19":""}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'cyp2c19ultrarapid': {'implication': 'Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.',
          'recommendation': 'Clopidogrel: label-recommended dosage and administration',
          'classification': 'Strong'},
  'cyp2c19normal': {'implication': 'Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.',
                  'recommendation': 'Clopidogrel: label-recommended dosage and administration',
                  'classification': 'Strong'},
  'cyp2c19intermediate': {'implication': 'Reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'recommendation': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'classification': 'Moderate'},
  'cyp2c19poor': {'implication': 'Significantly reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'recommendation': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'classification': 'Strong'}}
