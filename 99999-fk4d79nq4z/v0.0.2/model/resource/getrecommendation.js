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
var recommendation = {'enzyme': 'UGT1A1', 'drug':'Atazanavir','recommendation': {}}
// # Dictionary containing Phenotype to Recommendation Information
var pheno_recom = {
  'Normal metabolizer': {'Implications for phenotypic measures': 'Reference UGT1A1 activity; very low likelihood of bilirubin-related discontinuation of atazanavir.',
          'Dosing recommendations': 'There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient?s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).',
          'Classification of recommendations': 'Strong'},
  'Intermediate metabolizer': {'Implications for phenotypic measures': 'Somewhat decreased UGT1A1 activity; low likelihood of bilirubin-related discontinuation of atazanavir.',
          'Dosing recommendations': 'There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient?s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).',
          'Classification of recommendations': 'Strong'},
  'Poor metabolizer': {'Implications for phenotypic measures': 'Markedly decreased UGT1A1 activity; high likelihood of bilirubin-related discontinuation of atazanavir.',
          'Dosing recommendations': 'Consider an alternative agent particularly where jaundice would be of concern to the patient. If atazanavir is to be prescribed, there is a high likelihood of developing jaundice that will result in atazanavir discontinuation (at least 20% and as high as 60%).',
          'Classification of recommendations': 'Strong'}}
