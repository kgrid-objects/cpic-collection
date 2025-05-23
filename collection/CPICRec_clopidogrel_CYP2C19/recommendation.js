function dosingrecommendation (inputs) {
  try {
    var genes = {}
    var output = {}
    var searchkeyReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    var searchKey = ''
    var targetfield =''
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in reference) {
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey]={}
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      targetfield = reference[genekey].field
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].negative
        }
      }
      if(targetfield=='phenotype'){
        if (genes[genekey].phenotype != "") {
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','')
        }
      }
    }
    if (searchkeyReady) {
      if(recommendations[searchKey]!=null){
        output.type='CPIC Recommendation'
        output.drug=drug
        output["genes"] = JSON.parse(JSON.stringify(genes))
        output.recommendation={}
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
var drug = 'clopidogrel'
var reference = {'CYP2C19':{field:'phenotype', value:''}}

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

module.exports = { dosingrecommendation };