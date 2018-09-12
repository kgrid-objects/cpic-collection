function dosingrecommendation (inputs) {
  try {
    var phenotype = inputs[gene] || ''
    if (phenotype!='') {
      var searchKey = gene+' '+phenotype
      if(recommendations[searchKey]!=null){
        output["phenotypes"][gene] = phenotype
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
var gene = 'CYP2D6'
var drug = 'Codeine'
// # Dictionary containing Phenotype to Recommendation Information
var output =   { "type":"CPIC Recommendation","drug":"codeine","phenotypes":{"CYP2D6":""}, "recommendation":{"classification":"",  "content":"","implication":""}}

var recommendations = {
  'CYP2D6 Ultrarapid metabolizer': {'implication': 'Increased formation of morphine following codeine administration, leading to higher risk of toxicity',
          'recommendation': 'Avoid codeine use due to potential for toxicity. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity',
          'classification': 'Strong'},
  'CYP2D6 Normal metabolizer': {'implication': 'Normal morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing.',
          'classification': 'Strong'},
  'CYP2D6 Intermediate metabolizer': {'implication': 'Reduced morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid. Monitor tramadol use for response.',
          'classification': 'Moderate'},
  'CYP2D6 Poor metabolizer': {'implication': 'Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief. ',
          'recommendation': 'Avoid codeine use due to lack of efficacy. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity; these agents should be avoided',
          'classification': 'Strong'}
        }
