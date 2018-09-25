var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4t85em9x/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"cyp3a5": {"diplotype": "*1/*1", "phenotype": "Normal metabolizer"}},"output":"classification" },
  {"input":{"cyp3a5": {"diplotype": "*1/*2", "phenotype": "Intermediate metabolizer"}},"output":"content" },
  {"input":{"cyp3a5": {"diplotype": "*2/*2", "phenotype": "Low metabolizer"}},"output":"implication" }

]

describe('99999-fk4cz4fm8f v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.cyp3a5.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug tacrolimus', result);
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"cyp3a5": "Normal metabolizer"})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"cyp3a5": {"phenotype": "High metabolizer"}})
      assert.equal('Incorrect/invalid input for drug tacrolimus', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug tacrolimus', result);
    })

  });

});
