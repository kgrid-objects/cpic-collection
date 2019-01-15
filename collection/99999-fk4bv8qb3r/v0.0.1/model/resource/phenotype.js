function phenotype (inputs) {
  var output = {}
  output[gene] = {}
  var alleles = inputs[gene].split('/')
  var count = 0
  if(((list[alleles[0]]!='Unknown function/Uncertain function') && list[alleles[0]]!='Possible decreased function')
      && ((list[alleles[1]]!='Unknown function/Uncertain function') && list[alleles[1]]!='Possible decreased function')){
    alleles.forEach(function(e, index){
      switch(list[e]){
        case 'Normal function':
          count=count+2;
          break;
        case 'Decreased function':
        case 'No function':
          count=count+1;
          break;
    }
  })
  count=count-1
}

  output[gene].diplotype = inputs[gene]
  output[gene].phenotype = dict[count]
  if(count>0) {
    output[gene].phenotype = output[gene].phenotype +' metabolizer'
  }
  return output

}

var gene = 'CYP2C9'

var dict = ['TBD', 'Poor', 'Intermediate', 'Extensive']


var list = {"*1": "Normal function", "*2": "Decreased function", "*3": "Decreased function",
  "*4": "Possible decreased function", "*5": "Possible decreased function", "*6": "No function",
  "*7": "Unknown function/Uncertain function", "*8": "Possible decreased function",
  "*9": "Normal function", "*10": "Unknown function/Uncertain function", "*11": "Possible decreased function",
  "*12": "Possible decreased function", "*13": "Possible decreased function",
  "*14": "Unknown function/Uncertain function", "*15": "No function",
  "*16": "Unknown function/Uncertain function", "*17": "Unknown function/Uncertain function",
  "*18": "Unknown function/Uncertain function", "*19": "Unknown function/Uncertain function",
  "*20": "Unknown function/Uncertain function", "*21": "Unknown function/Uncertain function",
  "*22": "Unknown function/Uncertain function", "*23": "Unknown function/Uncertain function",
  "*24": "Unknown function/Uncertain function", "*25": "No function", "*26": "Unknown function/Uncertain function",
  "*27": "Unknown function/Uncertain function", "*28": "Unknown function/Uncertain function",
  "*29": "Unknown function/Uncertain function", "*30": "Unknown function/Uncertain function",
  "*31": "Possible decreased function", "*32": "Unknown function/Uncertain function",
  "*33": "Unknown function/Uncertain function", "*34": "Unknown function/Uncertain function",
  "*35": "Unknown function/Uncertain function", "*36": "Unknown function/Uncertain function",
  "*37": "Unknown function/Uncertain function", "*38": "Unknown function/Uncertain function",
  "*39": "Unknown function/Uncertain function", "*40": "Unknown function/Uncertain function",
  "*41": "Unknown function/Uncertain function", "*42": "Unknown function/Uncertain function",
  "*43": "Unknown function/Uncertain function", "*44": "Unknown function/Uncertain function",
  "*45": "Unknown function/Uncertain function", "*46": "Unknown function/Uncertain function",
  "*47": "Unknown function/Uncertain function", "*48": "Unknown function/Uncertain function",
  "*49": "Unknown function/Uncertain function", "*50": "Unknown function/Uncertain function",
  "*51": "Unknown function/Uncertain function", "*52": "Unknown function/Uncertain function",
  "*53": "Unknown function/Uncertain function", "*54": "Unknown function/Uncertain function",
  "*55": "Unknown function/Uncertain function", "*56": "Unknown function/Uncertain function",
  "*57": "Unknown function/Uncertain function", "*58": "Unknown function/Uncertain function",
  "*59": "Unknown function/Uncertain function", "*60": "Unknown function/Uncertain function"}