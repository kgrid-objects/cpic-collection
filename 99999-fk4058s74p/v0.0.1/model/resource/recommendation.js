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
        searchKey = genekey.toLowerCase()+allele+'carrier'
      } else if (genes[genekey].diplotype === '') {
        break
      } else {
        searchKey = genekey.toLowerCase()+allele+'noncarrier'
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
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines HLA-B gene to abacavir Recommendation
var genes = {'HLA-B':{}}
var drug = 'allopurinol'
var allele = '58:01'
// var keymap = {'hla-b57:01noncarrier':'negative',"hla-b57:01carrier":'positive'}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"allopurinol","genes":{"HLA-B":{}}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'hla-b58:01noncarrier': {'implication': 'Low or reduced risk of allopurinol-induced SCAR',
          'recommendation': 'Use allopurinol per standard dosing guidelines',
          'classification': 'Strong'},
  'hla-b58:01carrier': {'implication': 'Significantly increased risk of allopurinol-induced SCAR',
                  'recommendation': 'Allopurinol is contraindicated',
                  'classification': 'Strong'}}
