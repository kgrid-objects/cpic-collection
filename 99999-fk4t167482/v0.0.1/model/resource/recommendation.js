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
    for(var genekey in base) {
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey]={}
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      targetfield = base[genekey].field
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(base[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+base[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+base[genekey].value+keysuffix[genekey].negative
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
var drug = 'amitriptyline'
var base = {'CYP2C19':{field:'phenotype', value:''},'CYP2D6':{field:'phenotype', value:''}}
// # Dictionary containing Phenotype to Recommendation Information
var recommendations = {'cyp2c19ultrarapidcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6normal":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19ultrarapidcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},

'cyp2c19rapidcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6normal":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider alternative drug not metabolized by CYP2C19',
        'classification': 'Optional'},
"cyp2c19rapidcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},

'cyp2c19normalcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider titrating to a higher target dose (compared to normal metabolizers)',
        'classification': 'Strong'},
"cyp2c19normalcyp2d6normal":{'implication': '',
        'recommendation': 'Initiate therapy with recommended starting dose',
        'classification': 'Strong'},
"cyp2c19normalcyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider a 25% reduction of recommended starting dose',
        'classification': 'Moderate'},
"cyp2c19normalcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose',
        'classification': 'Strong'},

'cyp2c19intermediatecyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use.',
        'classification': 'Optional'},
"cyp2c19intermediatecyp2d6normal":{'implication': '',
        'recommendation': 'Initiate therapy with recommended starting dose',
        'classification': 'Strong'},
"cyp2c19intermediatecyp2d6intermediate":{'implication': '',
        'recommendation': 'Consider a 25% reduction of recommended starting dose',
        'classification': 'Optional'},
"cyp2c19intermediatecyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose.',
        'classification': 'Optional'},

'cyp2c19poorcyp2d6ultrarapid':{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19poorcyp2d6normal":{'implication': '',
        'recommendation': 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose',
        'classification': 'Moderate'},
"cyp2c19poorcyp2d6intermediate":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'},
"cyp2c19poorcyp2d6poor":{'implication': '',
        'recommendation': 'Avoid amitriptyline use',
        'classification': 'Optional'}
}
