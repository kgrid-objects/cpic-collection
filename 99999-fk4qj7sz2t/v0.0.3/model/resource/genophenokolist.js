function genophenokolist(inputs){
  var list ={}
  for (var key in inputs){
    list[key]=kolist[key]
  }
  return list;
}

var kolist={"CACNA1S": "", "RYR1": "", "UGT1A1": "/99999/fk47h1x090/v0.0.3", "CYP2C19":"/99999/fk4mc97w0h/v0.0.3","CYP2D6": "/99999/fk49z9gr7p/v0.0.5", "CYP2C9" :"", "HLA-B" : "", "SLCO1B1" : ""}
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
