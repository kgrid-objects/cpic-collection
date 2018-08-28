function getrecommendation (inputs) {
  try {
    var enzyme = inputs.enzyme || ''
    var phenotype = inputs.phenotype || ''
    if ((enzyme!='')&&(phenotype!='')) {
      if(enzyme==recommendation.enzyme){
        if(pheno_recom[phenotype]!=null){
          recommendation.recom = pheno_recom[phenotype]
          return recommendation
        } else {
          return "Incorrect/invalid input for phenotype."
        }
      } else {
        return "Expecting " +recommendation.enzyme+ " as enzyme input for this KO."
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error'
  }
}

// KGrid CPIC guidelines CYP2D6 Phenotype to Codeine Recommendation
var recommendation = {'enzyme': 'CYP2D6', 'drug':'Codeine','recom': {}}
// # Dictionary containing Phenotype to Recommendation Information
var pheno_recom = {
  'Ultrarapid metabolizer': {'Implications for phenotypic measures': 'Increased formation of morphine following codeine administration, leading to higher risk of toxicity',
          'Dosing recommendations': 'Avoid codeine use due to potential for toxicity.',
          'Classification of recommendations': 'Strong'},
  'Normal metabolizer': {'Implications for phenotypic measures': 'Normal morphine formation',
          'Dosing recommendations': 'Use label-recommended age- or weight-specific dosing.',
          'Classification of recommendations': 'Strong'},
  'Intermediate metabolizer': {'Implications for phenotypic measures': 'Reduced morphine formation',
          'Dosing recommendations': 'Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid.',
          'Classification of recommendations': 'Moderate'},
  'Poor metabolizer': {'Implications for phenotypic measures': 'Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief',
          'Dosing recommendations': 'Avoid codeine use due to lack of efficacy.',
          'Classification of recommendations': 'Strong'}}
