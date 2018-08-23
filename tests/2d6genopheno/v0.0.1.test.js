var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-2d6genopheno/v0.0.1/model/resource/getphenotype');

//Load in the function
var getphenotype = javascript.__get__("getphenotype");

var testset = [
  {"input":{"enzym":"CYP2D6","allele1": "*97",  "allele2": "*98"},"output":"TBD" },
  {"input":{"enzym":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"enzym":"CYP2D6","allele1": "*9",  "allele2": "*20"},"output":"TBD" },
  {"input":{"enzym":"CYP2D6","allele1": "*2",  "allele2": "*27"},"output":"TBD" },
  {"input":{"enzym":"CYP2D6","allele1": "*3",  "allele2": "*5"},"output":"TBD" },
  {"input":{"enzym":"CYP2D6","allele1": "*1002",  "allele2": "*27"},"output":"Unknown" }
]

describe('99999-2d6genopheno/v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = getphenotype(e.input)
        assert.equal(e.output, result.phenotype);
      });

    })


  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = getphenotype({})
      assert.equal('Invalid Input', result);
    })

    it('incorrect enzym', function(){
      var result = getphenotype({"enzym":"CYP2C9","allele1": "*1","allele2": "*1"})
      assert.equal(true, result.startsWith('Expecting'));
    })

    it('no input', function(){
      var result = getphenotype()
      assert.equal('Error', result);
    })

  });

});
