var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../collection/99999-fk4mc97w6m/v0.0.5/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"CYP2D6": {"diplotype": "*1/*28", "phenotype": "ultrarapid metabolizer"}},"output":"classification" },
  {"input":{"CYP2D6": {"diplotype": "*1/*1", "phenotype": "Normal metabolizer"}},"output":"classification" },
  {"input":{"CYP2D6": {"diplotype": "*1/*2", "phenotype": "Intermediate metabolizer"}},"output":"content" },
  {"input":{"CYP2D6": {"diplotype": "*1/*3", "phenotype": "Poor metabolizer"}},"output":"implication" }
]

describe('99999-2d6codeine v0.0.5', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.CYP2D6.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal(result, 'Incorrect/invalid input for drug Codeine');
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"CYP2D6": "Ultrarapid mettabolizer"})
      assert.equal(result, 'Incorrect/invalid input.');
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"CYP2D6": {"phenotype": "Ultrarapid mettabolizer"}})
      assert.equal('Incorrect/invalid input for drug Codeine', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal(result, 'Incorrect/invalid input for drug Codeine');
    })

  });

});
