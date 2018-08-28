var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk47h1x090/v0.0.2/model/resource/getphenotype');
//var javascript = rewire('../../scripts/payload.js');

//Load in the function
var getphenotype = javascript.__get__("getphenotype");

var testset = [
  // {"input":{"enzyme":"CYP2D6","allele1": "*1",  "allele2": "*98"},"output":"TBD" },
  // {"input":{"enzyme":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"enzyme":"UGT1A1","allele1": "*1",  "allele2": "*80"},"output":"Intermediate metabolizer" },
  {"input":{"enzyme":"UGT1A1","allele1": "*1",  "allele2": "*1"},"output":"Normal metabolizer" },
  {"input":{"enzyme":"UGT1A1","allele1": "*80",  "allele2": "*80"},"output":"Poor metabolizer" },
  {"input":{"enzyme":"UGT1A1","allele1": "*2",  "allele2": "*6"},"output":"Unknown" }
]

describe('99999-fk47h1x090/v0.0.2', function () {

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

    it('incorrect enzyme', function(){
      var result = getphenotype({"enzyme":"CYP2C9","allele1": "*1","allele2": "*1"})
      assert.equal(true, result.startsWith('Expecting'));
    })


    it('no input', function(){
      var result = getphenotype()
      assert.equal('Error', result);
    })

  });

});
