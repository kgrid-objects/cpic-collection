var assert = require('assert');
var tester = require('../../99999-2d6genopheno/v0.0.1/model/resource/getphenotypetest');

var testset = [
  {"input":{"allele1": "*97",  "allele2": "*98"},"output":"TBD" },
  {"input":{"allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"allele1": "*9",  "allele2": "*20"},"output":"TBD" },
  {"input":{"allele1": "*2",  "allele2": "*27"},"output":"TBD" },
  {"input":{"allele1": "*3",  "allele2": "*5"},"output":"TBD" },
  {"input":{"allele1": "*1002",  "allele2": "*27"},"output":"Unknown" }
]

describe('99999-2d6genopheno/v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = tester.getphenotype(e.input)
        assert.equal(e.output, result.phenotype);
      });

    })


  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = tester.getphenotype({})
      assert.equal('Invalid Input', result);
    })

    it('no input', function(){
      var result = tester.getphenotype()
      assert.equal('Error', result);
    })

  });

});
