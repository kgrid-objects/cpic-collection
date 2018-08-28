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
var recommendation = {'enzym': 'CYP2C19', 'drug':'citalopram and escitalopram','recom': {}}
// # Dictionary containing Phenotype to Recommendation Information
var pheno_recom = {
  'Ultrarapid metabolizer': {'Implications for phenotypic measures': 'Increased metabolism when compared to extensive metabolizers. Lower plasma concentrations will increase probability of pharmacotherapy failure.',
          'Dosing recommendations': 'Consider an alternative drug not predominantly metabolized by CYP2C19.',
          'Classification of recommendations': 'Moderate'},
  'Normal metabolizer': {'Implications for phenotypic measures': 'Normal metabolism',
          'Dosing recommendations': 'Initiate therapy with recommended starting dose.',
          'Classification of recommendations': 'Strong'},
  'Intermediate metabolizer': {'Implications for phenotypic measures': 'Reduced metabolism when compared to extensive metabolizers.',
          'Dosing recommendations': 'Initiate therapy with recommended starting dose.',
          'Classification of recommendations': 'Strong'},
  'Poor metabolizer': {'Implications for phenotypic measures': 'Greatly reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.',
          'Dosing recommendations': 'Consider a 50% reduction of recommended starting dose and titrate to response or select alternative drug not predominantly metabolized by CYP2C19',
          'Classification of recommendations': 'Moderate'}}
