var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4m91fj9z/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"tpmt": {"diplotype": "*1/*1", "phenotype": "Normal activity"}},"output":"classification" },
  {"input":{"tpmt": {"diplotype": "*1/*2", "phenotype": "Intermediate activity"}},"output":"content" },
  {"input":{"tpmt": {"diplotype": "*2/*2", "phenotype": "Low activity"}},"output":"implication" }

]

describe('99999-fk4cz4fm8f v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.tpmt.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug mercaptopurine', result);
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"tpmt": "Normal activity"})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"tpmt": {"phenotype": "High activity"}})
      assert.equal('Incorrect/invalid input for drug mercaptopurine', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug mercaptopurine', result);
    })

  });

});
