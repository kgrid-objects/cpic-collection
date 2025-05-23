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

var drug = 'ondansetron'
var reference = {'CYP2D6':{field:'phenotype', value:''}}

var recommendations = {
  'cyp2d6ultrarapid': {'implication': 'Increased metabolism to less active compounds when compared to NMs and is associated with decreased response to ondansetron and tropisetron (i.e., vomiting)',
          'recommendation': 'Select alternative drug not predominantly metabolized by CYP2D6 (i.e., granisetron). Dolasetron, palonosetron, and ramosetron are also metabolized by CYP2D6. Limited evidence is available regarding the utilization of CYP2D6 genetic variation to guide use of these drugs.',
          'classification': 'Moderate'},
  'cyp2d6normal': {'implication': 'NM',
          'recommendation': 'Initiate therapy with recommended starting dose.',
          'classification': 'Strong'},
  'cyp2d6intermediate': {'implication': 'Very limited data available for CYP2D6 IMs',
          'recommendation': 'Insufficient evidence demonstrating clinical impact based on CYP2D6 genotype. Initiate therapy with recommended starting dose.',
          'classification': 'No recommendation'},
  'cyp2d6poor': {'implication': 'Very limited data available for CYP2D6 PMs ',
          'recommendation': 'Insufficient evidence demonstrating clinical impact based on CYP2D6 genotype. Initiate therapy with recommended starting dose.',
          'classification': 'No recommendation'}
        }

module.exports = { dosingrecommendation };