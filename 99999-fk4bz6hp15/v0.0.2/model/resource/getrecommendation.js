function getrecommendation (inputs) {
  try {
    var enzym = inputs.enzym || ''
    var phenotype = inputs.phenotype || ''
    if ((enzym!='')&&(phenotype!='')) {
      if(enzym==recommendation.enzym){
        if(pheno_recom[phenotype]!=null){
          recommendation.recom = pheno_recom[phenotype]
          return recommendation
        } else {
          return "Incorrect/invalid input for phenotype."
        }
      } else {
        return "Expecting " +recommendation.enzym+ " as enzym input for this KO."
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error'
  }
}

// KGrid CPIC guidelines CYP2C19 Phenotype to citalopram and escitalopram Recommendation
var recommendation = {'enzym': 'CYP2C19', 'drug':'Clopidogrel','recom': {}}
// # Dictionary containing Phenotype to Recommendation Information
var pheno_recom = {
  'Ultrarapid metabolizer': {'Implications for phenotypic measures': 'Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.',
          'Dosing recommendations': 'Clopidogrel: label-recommended dosage and administration',
          'Classification of recommendations': 'Strong'},
  'Intermediate metabolizer': {'Implications for phenotypic measures': 'Reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'Dosing recommendations': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'Classification of recommendations': 'Moderate'},
  'Poor metabolizer': {'Implications for phenotypic measures': 'Significantly reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'Dosing recommendations': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'Classification of recommendations': 'Strong'}}
