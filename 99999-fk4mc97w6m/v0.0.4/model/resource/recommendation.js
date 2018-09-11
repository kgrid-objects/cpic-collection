function dosingrecommendation (inputs) {
  try {
    var phenotype = inputs[gene] || ''
    if (phenotype!='') {
      if(recommendations[phenotype]!=null){
        recommendation["phenotypes"][gene] = phenotype
        recommendation.implication.value=recommendations[phenotype].implication
        recommendation.recommendation.value=recommendations[phenotype].recommendation
        recommendation.classification.value=recommendations[phenotype].classification
        return recommendation
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
var recommendation =   { "drug":"codeine","phenotypes":{"CYP2D6":""}, "implication":{"label":"Implications for phenotypic measures","value":""},  "recommendation":{"label":"Dosing recommendations","value":""}, "classification":{"label":"Classification of recommendations","value":""}
  }

var recommendations = {
  'Ultrarapid metabolizer': {'implication': 'Increased formation of morphine following codeine administration, leading to higher risk of toxicity',
          'recommendation': 'Avoid codeine use due to potential for toxicity.',
          'classification': 'Strong'},
  'Normal metabolizer': {'implication': 'Normal morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing.',
          'classification': 'Strong'},
  'Intermediate metabolizer': {'implication': 'Reduced morphine formation',
          'recommendation': 'Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid.',
          'classification': 'Moderate'},
  'Poor metabolizer': {'implication': 'Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief',
          'recommendation': 'Avoid codeine use due to lack of efficacy.',
          'classification': 'Strong'}
        }
