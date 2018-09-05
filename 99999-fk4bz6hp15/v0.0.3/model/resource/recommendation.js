function dosingrecommendation (inputs) {
  try {
    var recommendation = {}
    var phenotype = inputs[gene] || ''
    if (phenotype!='') {
      if(pheno_recom[phenotype]!=null){
        recommendation[drug] = pheno_recom[phenotype]
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

// KGrid CPIC guidelines CYP2C19 Phenotype to citalopram and escitalopram Recommendation
var gene = 'CYP2C19'
var drug = 'Clopidogrel'
// # Dictionary containing Phenotype to Recommendation Information
var pheno_recom = {
  'Ultrarapid metabolizer': {'Implications for phenotypic measures': 'Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.',
          'Dosing recommendations': 'Clopidogrel: label-recommended dosage and administration',
          'Classification of recommendations': 'Strong'},
  'Normal metabolizer': {'Implications for phenotypic measures': 'Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.',
                  'Dosing recommendations': 'Clopidogrel: label-recommended dosage and administration',
                  'Classification of recommendations': 'Strong'},
  'Intermediate metabolizer': {'Implications for phenotypic measures': 'Reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'Dosing recommendations': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'Classification of recommendations': 'Moderate'},
  'Poor metabolizer': {'Implications for phenotypic measures': 'Significantly reduced platelet inhibition; increased residual platelet aggregation; increased risk for adverse cardiovascular events.',
          'Dosing recommendations': 'Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.',
          'Classification of recommendations': 'Strong'}}
