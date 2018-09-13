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

// KGrid CPIC guidelines UGT1A1 Phenotype to Atazanavir Recommendation
var phenotypes = {'UGT1A1':''}
var drug = 'Atazanavir'
var keymap = {"ugt1a1normal":'UGT1A1 Normal metabolizer',"ugt1a1intermediate":"UGT1A1 Intermediate metabolizer","ugt1a1poor":"UGT1A1 Poor metabolizer"}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"atazanavir","phenotypes":{"UGT1A1":""}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'ugt1a1normal': {'implication': 'Reference UGT1A1 activity; very low likelihood of bilirubin-related discontinuation of atazanavir.',
    'recommendation': 'There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient?s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).',
    'classification': 'Strong'},
  'ugt1a1intermediate': {'implication': 'Somewhat decreased UGT1A1 activity; low likelihood of bilirubin-related discontinuation of atazanavir.',
    'recommendation': 'There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient?s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).',
    'classification': 'Strong'},
  'ugt1a1poor': {'implication': 'Markedly decreased UGT1A1 activity; high likelihood of bilirubin-related discontinuation of atazanavir.',
    'recommendation': 'Consider an alternative agent particularly where jaundice would be of concern to the patient. If atazanavir is to be prescribed, there is a high likelihood of developing jaundice that will result in atazanavir discontinuation (at least 20% and as high as 60%).',
    'classification': 'Strong'}}
