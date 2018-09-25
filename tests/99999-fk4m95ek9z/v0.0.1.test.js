var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4m95ek9z/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"slco1b1": {"diplotype": "*1/*1", "phenotype": "Normal function"}},"output":"classification" },
  {"input":{"slco1b1": {"diplotype": "*1/*2", "phenotype": "Intermediate function"}},"output":"content" },
  {"input":{"slco1b1": {"diplotype": "*2/*2", "phenotype": "Low function"}},"output":"implication" }

]

describe('99999-fk4cz4fm8f v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.slco1b1.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug simvastatin', result);
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"slco1b1": "Normal function"})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"slco1b1": {"phenotype": "High function"}})
      assert.equal('Incorrect/invalid input for drug simvastatin', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug simvastatin', result);
    })

  });

});
