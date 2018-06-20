var assert = require('assert');
var tester =  require('../../99999-2d6codeine/v0.0.1/model/resource/getrecommendationtest.js');

var testset = [
  {"input":{"enzym":"CYP2D6","phenotype": "Ultrarapid metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"enzym":"CYP2D6","phenotype": "Normal metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"enzym":"CYP2D6","phenotype": "Intermediate metabolizer"},"output":"Dosing recommendations" },
  {"input":{"enzym":"CYP2D6","phenotype": "Poor metabolizer"},"output":"Classification of recommendations" }

]

describe('99999-2d6codeine v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.phenotype, function(){
        var result = tester.getrecommendation(e.input)
        assert.equal(true, result.recom[e.output]!=null);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = tester.getrecommendation({})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect enzym', function(){
      var result = tester.getrecommendation({"enzym":"CYP2C9","phenotype": "Ultrarapid metabolizer"})
      assert.equal(true, result.startsWith('Expecting'));
    })

    it('incorrect phenotype', function(){
      var result = tester.getrecommendation({"enzym":"CYP2D6","phenotype": "Ultrarapid mettabolizer"})
      assert.equal('Incorrect/invalid input for phenotype.', result);
    })

    it('no input', function(){
      var result = tester.getrecommendation()
      assert.equal('Error', result);
    })

  });

});
