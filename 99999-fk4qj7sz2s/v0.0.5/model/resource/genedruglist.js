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
  'abacavir': '/99999/fk45m7fn9t/v0.0.1',
  'allopurinol':'/99999/fk4058s74p/v0.0.1',
  'amitriptyline': '/99999/fk4t167482/v0.0.1',
  'atazanavir': '/99999/fk4d79nq4z/v0.0.5',
  'azathioprine':'',
  'carbamazepine':'/99999/fk4mw3nw5p/v0.0.1',
  'citalopram': '/99999/fk4d22836k/v0.0.5',
  'clomipramine':'',
  'clopidogrel': '/99999/fk4bz6hp15/v0.0.5',
  'codeine': '/99999/fk4mc97w6m/v0.0.5',
  'desipramine':'',
  'doxepin':'',
  'escitalopram': '/99999/fk4d22836l/v0.0.5',
  'fluvoxamine':'',
  'imipramine':'',
  'ivacaftor':'',
  'mercaptopurine':'',
  'nortriptyline':'',
  'ondansetron':'/99999/fk4c83hw23/v0.0.1',
  'oxcarbazepine':'/99999/fk4qc17m5z/v0.0.1',
  'paroxetine':'',
  'peginterferon alfa-2a':'',
  'peginterferon alfa-2b':'',
  'phenytoin': '',
  'rasburicase':'',
  'ribavirin':'',
  'sertraline':'',
  'simvastatin': '',
  'tacrolimus':'',
  'tamoxifen':'',
  'thioguanine':'',
  'trimipramine':'',
  'tropisetron':'/99999/fk4fn2d721/v0.0.1',
  'voriconazole':''
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
  var isEmpty = true
  for (var key in inputs) {
    if (inputs[key]!=null) {
      isEmpty = isEmpty && false
    }
  }
  if (isEmpty) {
    return drugkolist
  } else {

    for (var key in inputs) {
      list[key] = drugkolist[key]
    }
    return list
  }
}
