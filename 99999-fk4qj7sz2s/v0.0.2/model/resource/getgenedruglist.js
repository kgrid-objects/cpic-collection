var rawdruglist=[{ "value": "isoflurane", "text":"isoflurane","enzym":["CACNA1S","RYR1"],"reflink":["",""],"kos":[{"kotitle":"","kolink":""},{"kotitle":"","kolink":""}]},    { "value": "atazanavir", "text": "atazanavir","enzym":["UGT1A1"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-atazanavir-and-ugt1a1/"], "kos":[{"kotitle":"CPIC - Atazanavir Guideline for UGT1A1","kolink":"ark:/99999/fk4d79nq4z"}]},    { "value": "citalopram", "text": "citalopram","enzym":["CYP2C19"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-selective-serotonin-reuptake-inhibitors-and-cyp2d6-and-cyp2c19/"],"kos":[{"kotitle":"CPIC CYP2C19 citalopram and escitalopram recommendations","kolink":"ark:/99999/fk4d22836k"}]},    { "value": "clopidogrel", "text": "clopidogrel","enzym":["CYP2C19"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/"],"kos":[{"kotitle":"CPIC Guideline for Clopidogrel and CYP2C19","kolink":"ark:/99999/fk4bz6hp15"}]},    { "value": "codeine", "text": "codeine" ,"enzym":["CYP2D6"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/"], "kos":[{"kotitle":"CPIC - Codeine Guideline for CYP2D6","kolink":"ark:/99999/fk4mc97w6m"}]},    { "value": "escitalopram", "text": "escitalopram","enzym":["CYP2C19"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-selective-serotonin-reuptake-inhibitors-and-cyp2d6-and-cyp2c19/"],"kos":[{"kotitle":"CPIC CYP2C19 citalopram and escitalopram recommendations","kolink":"ark:/99999/fk4d22836k"}]},    { "value": "Phenytoin", "text": "Phenytoin" ,"enzym":["CYP2C9","HLA-B"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-phenytoin-and-cyp2c9-and-hla-b/","https://cpicpgx.org/guidelines/guideline-for-phenytoin-and-cyp2c9-and-hla-b/"],"kos":[{"kotitle":"CPIC Guideline for Phenytoin and CYP2C19","kolink":"ark:/99999/fk4r49zq07"},{"kotitle":"","kolink":""}]},    { "value": "simvastatin", "text": "simvastatin","enzym":["SLCO1B1"],"reflink":["https://cpicpgx.org/guidelines/guideline-for-simvastatin-and-slco1b1/"],"kos":[{"kotitle":"","kolink":""}]}];

function getgenedruglist(inputs){
var genelist= inputs['genelist'];
var druglist=inputs['druglist'];
var dl =[];
var gl =[];
this.rawdruglist.forEach(function(e){
    var bool=false;
    if((druglist.indexOf(e.value)!=-1)|(druglist.length==0)){
       var el = e.enzym;
       el.forEach(function(ee){
           if((genelist.length==0)|(genelist.indexOf(ee)!=-1)){
              if(gl.indexOf(ee)==-1){
                  gl.push(ee);
              }
              bool=true;
            }
        });
        if(bool) {dl.push(e);}
   }});
   var out ={'genelist':gl,'druglist':dl};
   return JSON.stringify(out);
}
