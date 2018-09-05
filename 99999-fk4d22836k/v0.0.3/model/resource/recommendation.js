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
var drug = 'citalopram and escitalopram'
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
