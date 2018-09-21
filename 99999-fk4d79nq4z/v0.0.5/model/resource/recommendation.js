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

// KGrid CPIC guidelines UGT1A1 Phenotype to Atazanavir Recommendation
var drug = 'Atazanavir'
var reference = {'UGT1A1':{field:'phenotype', value:''}}

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
