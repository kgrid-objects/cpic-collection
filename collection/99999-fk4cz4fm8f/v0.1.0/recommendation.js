function dosingrecommendation (inputs) {
  try {
    var genes = {}
    var output = {}
    var searchkeyReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    var searchKey = ''
    var targetfield =''
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in reference) {
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey]={}
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      targetfield = reference[genekey].field
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].negative
        }
      }
      if(targetfield=='phenotype'){
        if (genes[genekey].phenotype != "") {
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','')
        }
      }
    }
    if (searchkeyReady) {
      if(recommendations[searchKey]!=null){
        output.type='CPIC Recommendation'
        output.drug=drug
        output["genes"] = JSON.parse(JSON.stringify(genes))
        output.recommendation={}
        output.recommendation.implication=recommendations[searchKey].implication
        output.recommendation.content=recommendations[searchKey].recommendation
        output.recommendation.classification=recommendations[searchKey].classification
        return output
      } else {
        return "Incorrect/invalid input for drug " + drug
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}

// KGrid CPIC guidelines CYP2C19 Phenotype to Clopidogrel Recommendation
var drug = 'voriconazole'
var reference = {'CYP2C19':{field:'phenotype', value:''}}

var recommendations = {
  'cyp2c19ultrarapid': {'implication': 'In patients for whom an ultrarapid metabolizer genotype (*17/*17) is identified, the probability of attainment of therapeutic voriconazole concentrations is small with standard dosing.',
          'recommendation': 'Choose an alternative agent that is not dependent on CYP2C19 metabolism as primary therapy in lieu of voriconazole. Such agents include isavuconazole, liposomal amphotericin B, and posaconazole.',
          'classification': 'Moderate'},
  'cyp2c19rapid': {'implication': 'In patients for whom a rapid metabolizer genotype (*1/*17) is identified, the probability of attainment of therapeutic concentrations is modest with standard dosing.',
          'recommendation': 'Choose an alternative agent that is not dependent on CYP2C19 metabolism as primary therapy in lieu of voriconazole. Such agents include isavuconazole, liposomal amphotericin B, and posaconazole.',
          'classification': 'Moderate'},
  'cyp2c19normal': {'implication': 'Normal voriconazole metabolism',
                  'recommendation': 'Initiate therapy with recommended standard of care dosing',
                  'classification': 'Strong'},
  'cyp2c19intermediate': {'implication': 'Higher dose-adjusted trough concentrations of voriconazole compared with normal metabolizers.',
          'recommendation': 'Initiate therapy with recommended standard of care dosing',
          'classification': 'Moderate'},
  'cyp2c19poor': {'implication': 'Higher dose-adjusted trough concentrations of voriconazole and may increase probability of adverse events.',
          'recommendation': 'Choose an alternative agent that is not dependent on CYP2C19 metabolism as primary therapy in lieu of voriconazole. Such agents include isavuconazole, liposomal amphotericin B, and posaconazole.b In the event that voriconazole is considered to be the most appropriate agent, based on clinical advice, for a patient with poor metabolizer genotype, voriconazole should be administered at a preferably lower than standard dosage with careful therapeutic drug monitoring.',
          'classification': 'Moderate'}}
