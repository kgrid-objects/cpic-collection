function phenotype (inputs) {
  var output = {}
  output[gene] = {}
  var alleles = inputs[gene].split('/')
  var count = 0
  if((list[alleles[0]]!='Unknown/Unclear function')&&(list[alleles[1]]!='Unknown/Unclear function')){
    alleles.forEach(function(e, index){
      switch(list[e]){
        case 'Normal function':
          count=count+2;
          break;
        case 'Possible decreased function':
          count=count+1;
          break;
        case 'Possible increased function':
          count=count+1;
          break;
        case 'Decreased function':
          count=count+1;
          break;
    }
  })
  count=count-1
}

  output[gene].diplotype = inputs[gene]
  output[gene].phenotype = dict[count]
  if(count>0) {
    output[gene].phenotype = output[gene].phenotype +' function'
  }
  return output

}

var gene = 'SLCO1B1'

var dict = ['TBD', 'Low', 'Intermediate', 'Normal']

// var list = {'*1/*1': 5, '*1/*27': 4, '*1/*28': 4, '*1/*36': 5, '*1/*37': 4, '*1/*6': 4, '*1/*80': 4, '*27/*27': 1, '*27/*28': 1, '*27/*36': 4, '*27/*37': 1, '*27/*80': 1, '*28/*28': 1, '*28/*36': 4, '*28/*37': 1, '*28/*80': 1, '*36/*36': 5, '*36/*37': 4, '*36/*80': 4, '*37/*37': 1, '*37/*80': 1, '*6/*27': 1, '*6/*28': 1, '*6/*36': 4, '*6/*37': 1, '*6/*6': 1, '*6/*80': 1, '*80/*80': 1}

var list = {'*1A':'Normal function','*1B':'Normal function','*2':'Possible decreased function','*3':'Possible decreased function','*4':'Unknown function/Unclear function','*5':'Decreased function','*6':'Possible decreased function','*7':'Unknown function/Unclear function','*8':'Unknown function/Unclear function','*9':'Possible decreased function','*10':'Possible decreased function','*11':'Unknown function/Unclear function','*12':'Unknown function/Unclear function','*13':'Unknown function/Unclear function','*14':'Possible increased function','*15':'Decreased function','*16':'Unknown function/Unclear function','*17':'Decreased function','*18':'Unknown function/Unclear function','*19':'Unknown function/Unclear function','*20':'Unknown function/Unclear function','*21':'Unknown function/Unclear function','*22':'Unknown function/Unclear function','*23':'Possible decreased function','*24':'Unknown function/Unclear function','*25':'Unknown function/Unclear function','*26':'Unknown function/Unclear function','*27':'Unknown function/Unclear function','*28':'Unknown function/Unclear function','*29':'Unknown function/Unclear function','*30':'Unknown function/Unclear function','*31':'Possible decreased function','*32':'Unknown function/Unclear function','*33':'Unknown function/Unclear function','*34':'Unknown function/Unclear function','*35':'Possible increased function','*36':'Unknown function/Unclear function'}
