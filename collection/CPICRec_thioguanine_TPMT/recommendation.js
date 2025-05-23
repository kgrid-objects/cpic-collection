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
var drug = 'thioguanine'
var reference = {'TPMT':{field:'phenotype', value:''}}

var recommendations = {
  'tpmtnormal': {'implication': 'Lower concentrations of TGN metabolites, but note that TGN after TG are 5-10x higher than TGN after MP or azathioprine',
                  'recommendation': 'Start with normal starting dose. Adjust doses of TG and of other myelosuppressive therapy without any special emphasis on TG. Allow 2 weeks to reach steady state after each dose adjustment.',
                  'classification': 'Strong'},
  'tpmtintermediate': {'implication': 'Moderate to high concentrations of TGN metabolites; but note that TGN after TG are 5-10x higher than TGN after MP or azathioprine.',
          'recommendation': 'Start with reduced doses (reduce by 30-50%) and adjust doses of TG based on degree of myelosuppression and disease-specific guidelines. Allow 2-4 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, and depending on other therapy, emphasis should be on reducing TG over other agents.',
          'classification': 'Moderate'},
  'tpmtlow': {'implication': 'Extremely high concentrations of TGN metabolites; fatal toxicity possible without dose decrease',
          'recommendation': 'Start with drastically reduced doses16 (reduce daily dose by 10-fold and dose thrice weekly instead of daily) and adjust doses of TG based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. In setting of myelosuppression, emphasis should be on reducing TG over other agents. For nonmalignant conditions, consider alternative nonthiopurine immunosuppressant therapy.',
          'classification': 'Strong'}}

module.exports = { dosingrecommendation };