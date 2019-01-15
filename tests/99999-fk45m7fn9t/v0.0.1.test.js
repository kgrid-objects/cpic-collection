var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../collection/99999-fk45m7fn9t/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"HLA-B": {"diplotype": "*57:01/*1", "phenotype":""}},"output":"classification" },
  {"input":{"HLA-B": {"diplotype": "*1/*1", "phenotype":""}},"output":"content" },

]

describe('99999-fk45m7fn9t v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input['HLA-B'].diplotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal('Incorrect/invalid input for drug abacavir', result);
    })

    it('missing diplotype', function(){
      var result = dosingrecommendation({"HLA-B":{ "phenotype":""}})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug abacavir', result);
    })

  });

});
