var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4mc97w0h/v0.0.3/model/resource/phenotype');

//Load in the function
var phenotype = javascript.__get__("phenotype");

var testset = [
  {"input":{"CYP2C19":"*3/*30"},"output":"TBD" },
  // {"input":{"enzyme":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"CYP2C19":"*1/*2"},"output":"Intermediate metabolizer" },
  {"input":{"CYP2C19":"*16/*18"},"output":"Likely Intermediate metabolizer" },
  {"input":{"CYP2C19":"*1/*1"},"output":"Normal metabolizer" },
  {"input":{"CYP2C19":"*22/*26"},"output":"Poor metabolizer" },
  {"input":{"CYP2C19":"*35/*35"},"output":"Likely Poor metabolizer" },
  {"input":{"CYP2C19":"*2/*86"},"output":"Unknown" }
]

describe('99999-fk47h1x090/v0.0.3', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = phenotype(e.input)
        assert.equal(result.CYP2C19, e.output);
      });

    })
  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = phenotype({})
      assert.equal("Unknown", result.CYP2C19);
    })

    it('incorrect enzyme', function(){
      var result = phenotype({"CYP2C9":"*1/*1"})
      assert.equal("Unknown", result.CYP2C19);
    })


    it('no input', function(){
      var result = phenotype()
      assert.equal(true, result.startsWith("Error TypeError:"));
    })

  });

});
