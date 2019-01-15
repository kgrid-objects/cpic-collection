function getphenotype (inputs) {
  var diplotype = ''
  var output = {'enzyme': 'UGT1A1', 'phenotype': ''}
  try {
    var enzyme = inputs.enzyme || ''
    var a1 = inputs['allele1'] || ''
    var a2 = inputs['allele2'] || ''
    if ((enzyme != '') && (a1 != '') && (a2 != '')) {
      if (enzyme == output.enzyme) {
        diplotype = a1 + '-' + a2
        var index = list[diplotype]
        if (index == null) {
          diplotype = a2 + '-' + a1
          index = list[diplotype]
        }
        if (index == null) {
          output.phenotype = 'Unknown'
        } else {
          if (index == 0) {
            output.phenotype = dict[0]
          } else {
            output.phenotype = dict[index] + ' metabolizer'
          }
        }
        return output
      } else {
        return 'Expecting ' + output.enzyme + ' as enzyme input for this KO.'
      }
    } else {
      return 'Invalid Input'
    }
  } catch (error) {
    return 'Error'
  }
}

var dict = ['TBD', 'Poor', 'Likely Poor',  'Likely Intermediate', 'Intermediate', 'Normal', 'Rapid', 'Ultrarapid']

var list = {'*1-*1': 5, '*1-*27': 4, '*1-*28': 4, '*1-*36': 5, '*1-*37': 4, '*1-*6': 4, '*1-*80': 4, '*27-*27': 1, '*27-*28': 1, '*27-*36': 4, '*27-*37': 1, '*27-*80': 1, '*28-*28': 1, '*28-*36': 4, '*28-*37': 1, '*28-*80': 1, '*36-*36': 5, '*36-*37': 4, '*36-*80': 4, '*37-*37': 1, '*37-*80': 1, '*6-*27': 1, '*6-*28': 1, '*6-*36': 4, '*6-*37': 1, '*6-*6': 1, '*6-*80': 1, '*80-*80': 1}
