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
// KGrid CPIC guidelines CYP2D6 Phenotype to Codeine Recommendation
var drug = 'paroxetine'
var reference = {'CYP2D6':{field:'phenotype', value:''}}
var recommendations = {
  'cyp2d6ultrarapid': {'implication': 'Increased metabolism to less active compounds when compared to extensive metabolizers. Lower/undetectable plasma concentrations may increase probability of pharmacotherapy failure.',
          'recommendation': 'Select alternative drug not predominantly metabolized by CYP2D6.',
          'classification': 'Strong'},
  'cyp2d6normal': {'implication': 'Normal metabolism',
          'recommendation': 'Initiate therapy with recommended starting dose.',
          'classification': 'Strong'},
  'cyp2d6intermediate': {'implication': 'Reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.',
          'recommendation': 'Initiate therapy with recommended starting dose.',
          'classification': 'Moderate'},
  'cyp2d6poor': {'implication': 'Greatly reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.',
          'recommendation': 'Select alternative drug not predominantly metabolized by CYP2D6 or if paroxetine use warranted, consider a 50% reduction of recommended starting dose and titrate to response.',
          'classification': 'Optional'}
        }

module.exports = { dosingrecommendation };