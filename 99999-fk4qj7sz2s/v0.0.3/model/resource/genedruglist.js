// var rawdruglist={
//     "isoflurane":{"CACNA1S":"","RYR1":""},
//     "atazanavir":{"UGT1A1":"/99999/fk4d79nq4z/v0.0.3"},
//     "citalopram":{"CYP2C19":"/99999/fk4d22836k/v0.0.3"},
//     "clopidogrel":{"CYP2C19":"/99999/fk4bz6hp15/v0.0.3"},
//     "codeine":{"CYP2D6":"/99999/fk4mc97w6m/v0.0.3"},
//     "escitalopram":{"CYP2C19":"/99999/fk4d22836k/v0.0.3"},
//     "phenytoin" :{"CYP2C9":"","HLA-B":""},
//     "simvastatin":{"SLCO1B1":""}
//   }
var drugkolist = {
  'isoflurane': '',
  'atazanavir': '/99999/fk4d79nq4z/v0.0.3',
  'citalopram': '/99999/fk4d22836k/v0.0.3',
  'clopidogrel': '/99999/fk4bz6hp15/v0.0.3',
  'codeine': '/99999/fk4mc97w6m/v0.0.3',
  'escitalopram': '/99999/fk4d22836k/v0.0.3',
  'phenytoin': '',
  'simvastatin': ''
}
  // var genedruglist={
  //     "CACNA1S": {"isoflurane":""},
  //     "RYR1": {"isoflurane":""},
  //     "UGT1A1": { "atazanavir"  :"/99999/fk4d79nq4z/v0.0.3"},
  //     "CYP2C19": {"citalopram":"/99999/fk4d22836k/v0.0.3","clopidogrel":"/99999/fk4bz6hp15/v0.0.3","escitalopram":"/99999/fk4d22836k/v0.0.3"},
  //     "CYP2D6": { "codeine":"/99999/fk4mc97w6m/v0.0.3"},
  //     "CYP2C9" :{"phenytoin":""},
  //     "HLA-B" : {"phenytoin":""},
  //     "SLCO1B1" : {  "simvastatin" :""}
  //   }

function druglist (inputs) {
  var list = {}
  // var isEmpty = true
  // for (var key in inputs) {
  //   if (inputs.hasOwnProperty(key)) {
  //     isEmpty = isEmpty && false
  //   }
  // }
  // if (isEmpty) {
  //   return drugkolist
  // } else {
    for (var key in inputs) {
      list[key] = drugkolist[key]
    }
    return list
  // }
}
