function phenotype (inputs) {
  var output = {}
  output[gene] = {}
  var alleles = inputs[gene].split('/')
  var count = 0
  if((list[alleles[0]]!='Unknown Function')&&(list[alleles[1]]!='Unknown Function')&&(list[alleles[0]]!='Uncertain Function')&&(list[alleles[1]]!='Uncertain Function')){
    alleles.forEach(function(e, index){
      switch(list[e]){
        case 'Normal function':
          count=count+2;
          break;
        case 'No function':
          count=count+1;
          break;
        case 'No Function':
          count=count+1;
          break;
    }
  })
  count=count-1
}

  output[gene].diplotype = inputs[gene]
  output[gene].phenotype = dict[count]
  if(count>0) {
    output[gene].phenotype = output[gene].phenotype +' activity'
  }
  return output

}

var gene = 'TPMT'

var dict = ['TBD', 'Low', 'Intermediate', 'Normal']

var list = {'*1':'Normal function','*2':'No function','*3A':'No function','*3B':'No function','*3C':'No function','*4':'No function','*5':'Uncertain Function','*6':'Uncertain Function','*7':'Uncertain Function','*8':'Uncertain Function','*9':'Uncertain Function','*10':'Uncertain Function','*11':'No Function','*12':'Uncertain Function','*13':'Uncertain Function','*14':'No Function','*15':'No Function','*16':'Uncertain Function','*17':'Uncertain Function','*18':'Uncertain Function','*19':'Uncertain Function','*20':'Uncertain Function','*21':'Uncertain Function','*22':'Uncertain Function','*23':'No Function','*24':'Uncertain Function','*25':'Uncertain Function','*26':'Uncertain Function','*27':'Uncertain Function','*28':'Uncertain Function','*29':'No Function','*30':'Unknown Function','*31':'Uncertain Function','*32':'Uncertain Function','*33':'Uncertain Function','*34':'Uncertain Function','*35':'Unknown Function','*36':'Unknown Function','*37':'Uncertain Function','*38':'Unknown Function','*39':'Uncertain Function','*40':'Uncertain Function','*41':'No Function'}
