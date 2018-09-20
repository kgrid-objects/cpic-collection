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
var drug = 'oxcarbazepine'
var allele = '15:02'
var keysuffix= {negative:'negative', positive:'positive'}
// var keymap = {'hla-b57:01noncarrier':'negative',"hla-b57:01carrier":'positive'}
// # Dictionary containing Phenotype to Recommendation Information
// var output =   { "type":"CPIC Recommendation","drug":"oxcarbazepine","genes":{"HLA-B":{}}, "recommendation":{"classification":"",  "content":"","implication":""}}
var output =   {}

var recommendations = {
  'hla-b15:02negative': {'implication': 'Normal risk of oxcarbazepineinduced SJS/TEN',
          'recommendation': 'Use oxcarbazepine per standard dosing guidelines.',
          'classification': 'Strong'},
  'hla-b15:02positive': {'implication': ' Greater risk of oxcarbazepineinduced SJS/TEN',
                  'recommendation': 'Strong: If patient is oxcarbazepine naıve, do not use oxcarbazepine.  Optional: The latency period for druginduced SJS/TEN is short with continuous dosing and adherence to therapy (4-28 days), and cases usually occur within three months of dosing; therefore, if the patient has previously used oxcarbazepine consistently for longer than three months without incidence of cutaneous adverse reactions, cautiously consider use of oxcarbazepine in the future.',
                  'classification': 'Strong/Optional'}}
