var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../collection/99999-fk4d22836l/v0.0.5/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"CYP2C19": {"diplotype": "*1/*28", "phenotype": "Ultrarapid metabolizer"}},"output":"classification" },
  {"input":{"CYP2C19": {"diplotype": "*1/*23", "phenotype": "Normal metabolizer"}},"output":"classification" },
  {"input":{"CYP2C19": {"diplotype": "*1/*1", "phenotype": "Intermediate metabolizer"}},"output":"content" },
  {"input":{"CYP2C19": {"diplotype": "*1/*3", "phenotype": "Poor metabolizer"}},"output":"implication" }

]

describe('99999-fk4d22836l v0.0.5', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.CYP2C19.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(true, result.recommendation[e.output]!=null);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug escitalopram', result);
    })

    it('string phenotype instead of object', function(){
      var result = dosingrecommendation({"CYP2C19": "Ultrarapid metabolizer"})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"CYP2C19": {"phenotype": "Ultrarapid mettabolizer"}})
      assert.equal('Incorrect/invalid input for drug escitalopram', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug escitalopram', result);
    })

  });

});
