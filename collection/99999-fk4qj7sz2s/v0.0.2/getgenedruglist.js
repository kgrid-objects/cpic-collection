var rawdruglist = [{
  "value": "isoflurane",
  "text": "isoflurane",
  "enzyme": ["CACNA1S", "RYR1"],
  "reflink": ["", ""],
  "kos": [{"kotitle": "", "kolink": ""}, {"kotitle": "", "kolink": ""}]
}, {
  "value": "atazanavir",
  "text": "atazanavir",
  "enzyme": ["UGT1A1"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-atazanavir-and-ugt1a1/"],
  "kos": [{
    "kotitle": "CPIC - Atazanavir Guideline for UGT1A1",
    "kolink": "/99999/fk4d79nq4z/v0.0.2"
  }]
}, {
  "value": "citalopram",
  "text": "citalopram",
  "enzyme": ["CYP2C19"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-selective-serotonin-reuptake-inhibitors-and-cyp2d6-and-cyp2c19/"],
  "kos": [{
    "kotitle": "CPIC CYP2C19 citalopram and escitalopram recommendations",
    "kolink": "/99999/fk4d22836k/v0.0.2"
  }]
}, {
  "value": "clopidogrel",
  "text": "clopidogrel",
  "enzyme": ["CYP2C19"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/"],
  "kos": [{
    "kotitle": "CPIC Guideline for Clopidogrel and CYP2C19",
    "kolink": "/99999/fk4bz6hp15/v0.0.2"
  }]
}, {
  "value": "codeine",
  "text": "codeine",
  "enzyme": ["CYP2D6"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/"],
  "kos": [{
    "kotitle": "CPIC - Codeine Guideline for CYP2D6",
    "kolink": "/99999/fk4mc97w6m/v0.0.2"
  }]
}, {
  "value": "escitalopram",
  "text": "escitalopram",
  "enzyme": ["CYP2C19"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-selective-serotonin-reuptake-inhibitors-and-cyp2d6-and-cyp2c19/"],
  "kos": [{
    "kotitle": "CPIC CYP2C19 citalopram and escitalopram recommendations",
    "kolink": "/99999/fk4d22836k/v0.0.2"
  }]
}, {
  "value": "Phenytoin",
  "text": "Phenytoin",
  "enzyme": ["CYP2C9", "HLA-B"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-phenytoin-and-cyp2c9-and-hla-b/",
    "https://cpicpgx.org/guidelines/guideline-for-phenytoin-and-cyp2c9-and-hla-b/"],
  "kos": [{"kotitle": "", "kolink": ""}, {"kotitle": "", "kolink": ""}]
}, {
  "value": "simvastatin",
  "text": "simvastatin",
  "enzyme": ["SLCO1B1"],
  "reflink": ["https://cpicpgx.org/guidelines/guideline-for-simvastatin-and-slco1b1/"],
  "kos": [{"kotitle": "", "kolink": ""}]
}];

function getgenedruglist(inputs){
var genelist= inputs['genelist'];
var druglist=inputs['druglist'];
var dl =[];
var gl =[];
this.rawdruglist.forEach(function(e){
    var bool=false;
    if((druglist.indexOf(e.value)!=-1)|(druglist.length==0)){
       var el = e.enzyme;
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
