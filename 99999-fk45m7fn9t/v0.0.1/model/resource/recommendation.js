function dosingrecommendation (inputs) {
  try {
    var phenotypesReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    var searchKey
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in genes) {
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      if (genes[genekey].diplotype.indexOf(allele) != -1) {
        searchKey = genekey.toLowerCase()+allele+keysuffix.positive
      } else if (genes[genekey].diplotype === '') {
        break
      } else {
        searchKey = genekey.toLowerCase()+allele+keysuffix.negative
      }
    }
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
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines HLA-B gene to abacavir Recommendation
var genes = {'HLA-B':{}}
var drug = 'abacavir'
var allele = '57:01'
var keysuffix= {negative:'noncarrier', positive:'carrier'}
// var keymap = {'hla-b57:01noncarrier':'negative',"hla-b57:01carrier":'positive'}
// # Dictionary containing Phenotype to Recommendation Information
// var output =   { "type":"CPIC Recommendation","drug":"abacavir","genes":{"HLA-B":""}, "recommendation":{"classification":"",  "content":"","implication":""}}
var output =   {}

var recommendations = {
  'hla-b57:01noncarrier': {'implication': 'Low or reduced risk of abacavir hypersensitivity',
          'recommendation': 'abacavir: Use abacavir per standard dosing guidelines',
          'classification': 'Strong'},
  'hla-b57:01carrier': {'implication': 'Significantly increased risk of abacavir hypersensitivity',
                  'recommendation': 'abacavir: Abacavir is not recommended',
                  'classification': 'Strong'}}
