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
      // searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')     // Disabled for TCAs
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].negative
        }
      }
      if(targetfield=='phenotype'){
        // if (genes[genekey].phenotype != "") {      // Disabled for TCAs
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','')
        // }                                          // Disabled for TCAs
      }
    }
    if (searchkeyReady) {
      if(recommendations[searchKey]!=null){
        output.type='DPWG Recommendation'
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

// KGrid DPWG guidelines CYP2C19 Phenotype to clomipramine Recommendation
var drug = 'clomipramine'
var reference = {'CYP2C19':{field:'phenotype', value:''}}
// # Dictionary containing Phenotype to Recommendation Information
var recommendations = {
  "cyp2c19poor":{'implication': 'The gene variation increases the plasma concentration of clomipramine. However, there is insufficient evidence to substantiate an increase of the plasma concentration of clomipramine+desmethylclomipramine to such an extent that it increases the risk of side effects. The increase in the plasma concentration of clomipramine is favourable for the efficacy in anxiety and obsessive compulsive disorder.',
        'recommendation': 'NO action is required for this gene-drug interaction.',
        'classification': ''}
}

module.exports = { dosingrecommendation };