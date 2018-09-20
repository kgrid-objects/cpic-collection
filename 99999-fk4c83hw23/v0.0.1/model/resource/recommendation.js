function dosingrecommendation (inputs) {
  try {
    var phenotypesReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    var searchKey = ''
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in genes){
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      phenotypesReady = phenotypesReady && (genes[genekey].phenotype!='')
      if(phenotypesValue!=''){
        phenotypesValue = phenotypesValue+' '
      }
      phenotypesValue =phenotypesValue + genekey+ " "+genes[genekey].phenotype
    }
    if (phenotypesReady) {
      for( var key in keymap){
        if(keymap[key].toLowerCase()==phenotypesValue.toLowerCase()){
          searchKey = key
          break
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
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines CYP2D6 Phenotype to Codeine Recommendation
var genes = {'CYP2D6':{}}
var drug = 'ondansetron'
var keymap = {'cyp2d6ultrarapid':'CYP2D6 Ultrarapid metabolizer',"cyp2d6normal":'CYP2D6 Normal metabolizer',"cyp2d6intermediate":"CYP2D6 Intermediate metabolizer","cyp2d6poor":"CYP2D6 Poor metabolizer"}
// # Dictionary containing Phenotype to Recommendation Information
var output =   {}

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
