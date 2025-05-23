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
var drug = 'mercaptopurine'
var reference = {'TPMT':{field:'phenotype', value:''}}

var recommendations = {
  'tpmtnormal': {'implication': 'Lower concentrations of TGN metabolites, higher methylTIMP, this is the "normal" pattern',
                  'recommendation': 'Start with normal starting dose (e.g., 75mg/m2/d or 1.5mg/kg/d) and adjust doses of MP (and of any other myelosuppressive therapy) without any special emphasis on MP compared to other agents. Allow 2 weeks to reach steady state after each dose adjustment.',
                  'classification': 'Strong'},
  'tpmtintermediate': {'implication': 'Moderate to high concentrations of TGN metabolites; low concentrations of methylTIMP',
          'recommendation': 'Start with reduced doses (start at 30-70% of full dose: e.g., at 50mg/m2/d or 0.75mg/kg/d) and adjust doses of MP based on degree of myelosuppression and disease-specific guidelines. Allow 2-4 weeks to reach steady state after each dose adjustment. In those who require a dosage reduction based on myelosuppression, the median dose may be ~40% lower (44mg/m2) than that tolerated in wild-type patients (75mg/m2).6,12 In setting of myelosuppression, and depending on other therapy, emphasis should be on reducing MP over other agents.',
          'classification': 'Strong'},
  'tpmtlow': {'implication': 'Extremely high concentrations of TGN metabolites; fatal toxicity possible without dose decrease; no methylTIMP metabolites',
          'recommendation': 'For malignancy, start with drastically reduced doses (reduce daily dose by 10-fold and reduce frequency to thrice weekly instead of daily, e.g., 10mg/ m2/d given just 3 days/week) and adjust doses of MP based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, emphasis should be on reducing MP over other agents. For nonmalignant conditions, consider alternative nonthiopurine immunosuppressant therapy.',
          'classification': 'Strong'}}

module.exports = { dosingrecommendation };