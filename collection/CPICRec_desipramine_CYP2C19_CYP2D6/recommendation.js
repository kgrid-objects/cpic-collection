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
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')     // Disabled for TCAs
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].negative
        }
      }
      if(targetfield=='phenotype'){
         if (genes[genekey].phenotype != "") {      // Disabled for TCAs
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','')
         }                                          // Disabled for TCAs
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

// KGrid CPIC guidelines CYP2C19 and CYP2D6 Phenotypes to desipramine Recommendation
var drug = 'desipramine'
var reference = {'CYP2D6':{field:'phenotype', value:''}}
// # Dictionary containing Phenotype to Recommendation Information
var recommendations = {

  'cyp2d6ultrarapid':{'implication': 'Increased metabolism of TCAs to less active compounds compared to normal metabolizers Lower plasma concentrations of active drug will increase probability of pharmacotherapy failure',
        'recommendation': 'Avoid tricyclic use due to potential lack of efficacy. Consider alternative drug not metabolized by CYP2D6. If a TCA is warranted, consider titrating to a higher target dose (compared to normal metabolizers). Utilize therapeutic drug monitoring to guide dose adjustments.',
        'classification': 'Optional'},
  "cyp2d6normal":{'implication': 'Normal metabolism of TCAs',
        'recommendation': ' Initiate therapy with recommended starting dose.',
        'classification': 'Strong'},
  "cyp2d6intermediate":{'implication': 'Reduced metabolism of TCAs to less active compounds compared to normal metabolizers Higher plasma concentrations of active drug will increase the probability of side effects',
        'recommendation': 'Consider a 25% reduction of recommended starting dose. Utilize therapeutic drug monitoring to guide dose adjustments.',
        'classification': 'Optional'},
  "cyp2d6poor":{'implication': 'Greatly reduced metabolism of TCAs to less active compounds compared to normal metabolizers Higher plasma concentrations of active drug will increase the probability of side effects',
        'recommendation': 'Avoid tricyclic use due to potential for side effects. Consider alternative drug not metabolized by CYP2D6. If a TCA is warranted, consider a 50% reduction of recommended starting dose. Utilize therapeutic drug monitoring to guide dose adjustments',
        'classification': 'Optional'}

}

module.exports = { dosingrecommendation };