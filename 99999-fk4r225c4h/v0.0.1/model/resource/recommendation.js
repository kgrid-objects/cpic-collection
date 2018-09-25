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
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','').replace('activity','')
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

// KGrid CPIC guidelines TPMT Phenotype to Clopidogrel Recommendation
var drug = 'azathioprine'
var reference = {'TPMT':{field:'phenotype', value:''}}

var recommendations = {
  'tpmtnormal': {'implication': '',
                  'recommendation': 'Start with normal starting dose (e.g., 2-3mg/kg/d) and adjust doses of azathioprine based on disease-specific guidelines. Allow 2 weeks to reach steady state after each dose adjustment.',
                  'classification': 'Strong'},
  'tpmtintermediate': {'implication': '',
          'recommendation': 'If disease treatment normally starts at the “full dose”, consider starting at 30–70% of target dose (e.g., 1–1.5mg/kg/d), and titrate based on tolerance. Allow 2–4 weeks to reach steady state after each dose adjustment.',
          'classification': 'Strong'},
  'tpmtlow': {'implication': '',
          'recommendation': 'Consider alternative agents. If using azathioprine start with drastically reduced doses (reduce daily dose by 10-fold and dose thrice weekly instead of daily) and adjust doses of azathioprine based on  degree of myelosuppression and disease-specific guidelines. Allow 4–6 weeks to reach steady state after each dose adjustment. Azathioprine is the likely cause of myelosuppression.',
          'classification': 'Strong'}}
