function dosingrecommendation (inputs) {
  try {
    var phenotypesReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in phenotypes){
      key = genekey.toLowerCase()
      phenotypes[genekey] = lowercaseInput[key] || ''
      phenotypes[genekey] = phenotypes[genekey].toLowerCase()
      phenotypesReady = phenotypesReady && (phenotypes[genekey]!='')
      if(phenotypesValue!=''){
        phenotypesValue = phenotypesValue+' '
      }
      phenotypesValue =phenotypesValue + genekey+ " "+phenotypes[genekey]
    }
    if (phenotypesReady) {
      var searchKey = ''
      for( var key in keymap){
        if(keymap[key].toLowerCase()==phenotypesValue.toLowerCase()){
          searchKey = key
          break
        }
      }
      if(recommendations[searchKey]!=null){
        output["phenotypes"] = JSON.parse(JSON.stringify(phenotypes))
        output.recommendation.implication=recommendations[searchKey].implication
        output.recommendation.content=recommendations[searchKey].recommendation
        output.recommendation.classification=recommendations[searchKey].classification
        return output
      } else {
        return "Incorrect/invalid input for phenotype."
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines CYP2D6 Phenotype to Codeine Recommendation
var phenotypes = {'CYP2D6':''}
var drug = 'Codeine'
var keymap = {'cyp2d6ultrarapid':'CYP2D6 Ultrarapid metabolizer',"cyp2d6normal":'CYP2D6 Normal metabolizer',"cyp2d6intermediate":"CYP2D6 Intermediate metabolizer","cyp2d6poor":"CYP2D6 Poor metabolizer"}
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"codeine","phenotypes":{"CYP2D6":""}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'cyp2d6ultrarapid': {'implication': 'Increased formation of morphine following codeine administration, leading to higher risk of toxicity',
          'recommendation': 'Avoid codeine use due to potential for toxicity. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity',
          'classification': 'Strong'},
  'cyp2d6normal': {'implication': 'Normal morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing.',
          'classification': 'Strong'},
  'cyp2d6intermediate': {'implication': 'Reduced morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid. Monitor tramadol use for response.',
          'classification': 'Moderate'},
  'cyp2d6poor': {'implication': 'Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief. ',
          'recommendation': 'Avoid codeine use due to lack of efficacy. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity; these agents should be avoided',
          'classification': 'Strong'}
        }
