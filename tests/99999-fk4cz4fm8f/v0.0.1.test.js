var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../collection/99999-fk4cz4fm8f/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"CYP2C19": {"diplotype": "*1/*20", "phenotype": "Ultrarapid metabolizer"}},"output":"classification" },
  {"input":{"CYP2C19": {"diplotype": "*1/*8", "phenotype": "Intermediate metabolizer"}},"output":"content" },
  {"input":{"CYP2C19": {"diplotype": "*1/*1", "phenotype": "Poor metabolizer"}},"output":"implication" }

]

describe('99999-fk4cz4fm8f v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.CYP2C19.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug voriconazole', result);
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"CYP2C19": "Ultrarapid metabolizer"})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"CYP2C19": {"phenotype": "Ultrarapid mettabolizer"}})
      assert.equal('Incorrect/invalid input for drug voriconazole', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug voriconazole', result);
    })

  });

});
