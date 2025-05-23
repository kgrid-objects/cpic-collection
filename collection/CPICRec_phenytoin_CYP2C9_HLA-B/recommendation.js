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

// KGrid CPIC guidelines CYP2C19 and CYP2D6 Phenotypes to amitriptyline Recommendation
var drug = 'Phenytoin'
var reference = {'CYP2C9':{field:'phenotype', value:''},'HLA-B':{field:'diplotype', value:'15:02'}}
var keysuffix= {'HLA-B':{negative:'noncarrier', positive:'carrier'}}   //dipltotype only
// # Dictionary containing Phenotype to Recommendation Information
var recommendations = {'cyp2c9extensivehla-b15:02carrier':{'implication': 'Increased risk of phenytoin induced Stevens-Johnson syndrome/toxic epidermal necrolysis',
        'recommendation': 'If patient is phenytoin naive, do not use phenytoin/fosphenytoinc',
        'classification': 'Strong'},
"cyp2c9extensivehla-b15:02noncarrier":{'implication': 'Normal phenytoin metabolism',
        'recommendation': 'Initiate therapy with recommended maintenance dose',
        'classification': 'Strong'},

'cyp2c9intermediatehla-b15:02carrier':{'implication': 'Increased risk of phenytoin induced  Stevens-Johnson syndrome/toxic epidermal necrolysis',
        'recommendation': 'If patient is phenytoin naive, do not use phenytoin/fosphenytoinc',
        'classification': 'Strong'},
"cyp2c9intermediatehla-b15:02noncarrier":{'implication': 'Reduced phenytoin metabolism. Higher plasma concentrations will increase probability of toxicities',
        'recommendation': 'Consider 25% reduction of recommended starting maintenance dose. Subsequent maintenance doses should be adjusted according to therapeutic drug monitoring and response',
        'classification': 'Moderate'},

  'cyp2c9poorhla-b15:02carrier':{'implication': 'Increased risk of phenytoin induced  Stevens-Johnson syndrome/toxic epidermal necrolysis',
    'recommendation': 'If patient is phenytoin naive, do not use phenytoin/fosphenytoinc',
    'classification': 'Strong'},
  "cyp2c9poorhla-b15:02noncarrier":{'implication': 'Reduced phenytoin metabolism. Higher plasma concentrations will increase probability of toxicities',
    'recommendation': 'Consider 50% reduction of recommended starting maintenance dose. Subsequent maintenance doses should be adjusted according to therapeutic drug monitoring and response',
    'classification': 'Strong'},
}

module.exports = { dosingrecommendation };
