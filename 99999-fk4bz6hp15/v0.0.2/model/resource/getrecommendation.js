function getrecommendation (inputs) {
  try {
    var enzyme = inputs.enzyme || ''
    var phenotype = inputs.phenotype || ''
    if ((enzyme!='')&&(phenotype!='')) {
      if(enzyme==recommendation.enzyme){
        if(pheno_recom[phenotype]!=null){
          recommendation.recommendation = pheno_recom[phenotype]
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

// KGrid CPIC guidelines CYP2C19 Phenotype to citalopram and escitalopram Recommendation
var recommendation = {'enzyme': 'CYP2C19', 'drug':'Clopidogrel','recommendation': {}}
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
