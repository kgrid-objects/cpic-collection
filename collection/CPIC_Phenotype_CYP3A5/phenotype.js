function phenotype (inputs) {
  var output = {}
  output[gene] = {}
  var alleles = inputs[gene].split('/')
  var count = 0
  if((list[alleles[0]]!='Unknown/Uncertain function')&&(list[alleles[1]]!='Unknown/Uncertain function')){
    alleles.forEach(function(e, index){
      switch(list[e]){
        case 'Normal function':
          count=count+2;
          break;
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

var gene = 'CYP3A5'

var dict = ['TBD', 'Poor', 'Intermediate', 'Extensive']

// var list = {'*1/*1': 5, '*1/*27': 4, '*1/*28': 4, '*1/*36': 5, '*1/*37': 4, '*1/*6': 4, '*1/*80': 4, '*27/*27': 1, '*27/*28': 1, '*27/*36': 4, '*27/*37': 1, '*27/*80': 1, '*28/*28': 1, '*28/*36': 4, '*28/*37': 1, '*28/*80': 1, '*36/*36': 5, '*36/*37': 4, '*36/*80': 4, '*37/*37': 1, '*37/*80': 1, '*6/*27': 1, '*6/*28': 1, '*6/*36': 4, '*6/*37': 1, '*6/*6': 1, '*6/*80': 1, '*80/*80': 1}

var list = {'*1':'Normal function', '*2':'Unknown/Uncertain function', '*3':'No function', '*4':'Unknown/Uncertain function', '*5':'Unknown/Uncertain function','*6':'No function','*7':'No function',
'*8':'Unknown/Uncertain function','*9':'Unknown/Uncertain function'}

module.exports = { phenotype };