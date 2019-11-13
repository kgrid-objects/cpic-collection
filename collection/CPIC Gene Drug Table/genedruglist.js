var drugkolist = {
  'abacavir': '/99999/fk45m7fn9t',
  'allopurinol':'/99999/fk4058s74p',
  'amitriptyline': '/99999/fk4t167482',
  'atazanavir': '/99999/fk4d79nq4z',
  'azathioprine':'/99999/fk4r225c4h',
  'carbamazepine':'/99999/fk4mw3nw5p',
  'citalopram': '/99999/fk4d22836k',
  'clomipramine':'/99999/fk4w67pr0f',
  'clopidogrel': '/99999/fk4bz6hp15',
  'codeine': '/99999/fk4mc97w6m',
  'desipramine':'/99999/fk4rf6zx6d',
  'doxepin':'/99999/fk4sf40t7f',
  'escitalopram': '/99999/fk4d22836l',
  'fluvoxamine':'/99999/cp4mc9723sd',
  'imipramine':'/99999/fk4d51vd1p',
  'mercaptopurine':'/99999/fk4m91fj9z',
  'nortriptyline':'/99999/fk44n0ds5c',
  'ondansetron':'/99999/fk4c83hw23',
  'oxcarbazepine':'/99999/fk4qc17m5z',
  'paroxetine':'/99999/cp4mc9723se',
  'phenytoin': '/99999/fk4qz3fz89',
  'sertraline':'/99999/fk40k3kt35',
  'simvastatin': '/99999/fk4m95ek9z',
  'tacrolimus':'/99999/fk4t85em9x',
  'thioguanine':'/99999/fk4cx5fm8f',
  'trimipramine':'/99999/fk4jw9m41b',
  'tropisetron':'/99999/fk4fn2d721',
  'voriconazole':'/99999/fk4cz4fm8f'
}

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
