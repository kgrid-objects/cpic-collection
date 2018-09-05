var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk47h1x090/v0.0.3/model/resource/phenotype');
//var javascript = rewire('../../scripts/payload.js');

//Load in the function
var phenotype = javascript.__get__("phenotype");

var testset = [
  // {"input":{"enzyme":"CYP2D6","allele1": "*1",  "allele2": "*98"},"output":"TBD" },
  // {"input":{"enzyme":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"UGT1A1":"*1/*80"},"output":"Intermediate metabolizer" },
  {"input":{"UGT1A1":"*1/*1"},"output":"Normal metabolizer" },
  {"input":{"UGT1A1":"*80/*80"},"output":"Poor metabolizer" },
  {"input":{"UGT1A1":"*2/*6"},"output":"Unknown" }
]

describe('99999-fk47h1x090/v0.0.3', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = phenotype(e.input)
        assert.equal(result.UGT1A1, e.output);
      });

    })


  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = phenotype({})
      assert.equal(result.UGT1A1, "Unknown");
    })

    it('incorrect enzyme', function(){
      var result = phenotype({"enzyme":"CYP2C9","allele1": "*1","allele2": "*1"})
      assert.equal(result.UGT1A1, "Unknown" );
    })


    it('no input', function(){
      var result = phenotype()
      assert.equal('Error', result);
    })

  });

});
