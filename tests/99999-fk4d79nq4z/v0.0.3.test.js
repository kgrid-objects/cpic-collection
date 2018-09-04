var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4d79nq4z/v0.0.3/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"UGT1A1": "Normal metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"UGT1A1": "Intermediate metabolizer"},"output":"Dosing recommendations" },
  {"input":{"UGT1A1": "Poor metabolizer"},"output":"Classification of recommendations" }

]

describe('99999-fk4d79nq4z v0.0.3', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.UGT1A1, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(true, result.Atazanavir[e.output]!=null);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"UGT1A1": "Ultrarapid mettabolizer"})
      assert.equal('Incorrect/invalid input for phenotype.', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal(result.includes('Error'), true);
    })

  });

});
