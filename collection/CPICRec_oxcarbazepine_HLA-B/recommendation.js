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

// KGrid CPIC guidelines HLA-B gene to abacavir Recommendation
var drug = 'oxcarbazepine'
var reference = {'HLA-B':{field:'diplotype', value:'15:02'}}
var keysuffix= {'HLA-B':{negative:'negative', positive:'positive'}}   //dipltotype only

var recommendations = {
  'hla-b15:02negative': {'implication': 'Normal risk of oxcarbazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis',
          'recommendation': 'Use oxcarbazepine per standard dosing guidelines.',
          'classification': 'Strong'},
  'hla-b15:02positive': {'implication': 'Greater risk of oxcarbazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis',
                  'recommendation': 'Strong: If patient is oxcarbazepine naıve, do not use oxcarbazepine.  Optional: The latency period for drug-induced Stevens-Johnson syndrome/toxic epidermal necrolysis is short with continuous dosing and adherence to therapy (4-28 days), and cases usually occur within three months of dosing; therefore, if the patient has previously used oxcarbazepine consistently for longer than three months without incidence of cutaneous adverse reactions, cautiously consider use of oxcarbazepine in the future.',
                  'classification': 'Strong/Optional'}}

module.exports = { dosingrecommendation };