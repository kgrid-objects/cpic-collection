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
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','').replace('activity','').replace('function','')
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

// KGrid CPIC guidelines CYP3A5 Phenotype to Clopidogrel Recommendation
var drug = 'tacrolimus'
var reference = {'CYP3A5':{field:'phenotype', value:''}}

var recommendations = {
  'cyp3a5extensive': {'implication': 'Lower dose-adjusted trough concentrations of tacrolimus and decreased chance of achieving target tacrolimus concentrations.',
                  'recommendation': 'Increase starting dose 1.5-2 times recommended starting dose. Total starting dose should not exceed 0.3 mg/kg/day. Use therapeutic drug monitoring to guide dose adjustments.',
                  'classification': 'Strong'},
  'cyp3a5intermediate': {'implication': 'Lower dose-adjusted trough concentrations of tacrolimus and decreased chance of achieving target tacrolimus concentrations.',
          'recommendation': 'Increase starting dose 1.5-2 times recommended starting dose. Total starting dose should not exceed 0.3 mg/kg/day. Use therapeutic drug monitoring to guide dose adjustments.',
          'classification': 'Strong'},
  'cyp3a5poor': {'implication': 'Higher ("normal") dose-adjusted trough concentrations of tacrolimus and increased chance of achieving target tacrolimus concentrations.',
          'recommendation': 'Initiate therapy with standard recommended dose. Use therapeutic drug monitoring to guide dose adjustments.',
          'classification': 'Strong'}}

module.exports = { dosingrecommendation };
