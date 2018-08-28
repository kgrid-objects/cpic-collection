var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4d79nq4z/v0.0.2/model/resource/getrecommendation.js');

//Load in the function
var getrecommendation = javascript.__get__("getrecommendation");


var testset = [
  {"input":{"enzym":"UGT1A1","phenotype": "Normal metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"enzym":"UGT1A1","phenotype": "Intermediate metabolizer"},"output":"Dosing recommendations" },
  {"input":{"enzym":"UGT1A1","phenotype": "Poor metabolizer"},"output":"Classification of recommendations" }

]

describe('99999-fk4d79nq4z v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.phenotype, function(){
        var result = getrecommendation(e.input)
        assert.equal(true, result.recom[e.output]!=null);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = getrecommendation({})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect enzym', function(){
      var result = getrecommendation({"enzym":"CYP2C9","phenotype": "Ultrarapid metabolizer"})
      assert.equal(true, result.startsWith('Expecting'));
    })

    it('incorrect phenotype', function(){
      var result = getrecommendation({"enzym":"UGT1A1","phenotype": "Ultrarapid mettabolizer"})
      assert.equal('Incorrect/invalid input for phenotype.', result);
    })

    it('no input', function(){
      var result = getrecommendation()
      assert.equal('Error', result);
    })

  });

});
