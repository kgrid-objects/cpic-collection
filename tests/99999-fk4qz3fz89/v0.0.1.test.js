var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4qz3fz89/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"HLA-B":{"diplotype": "*1/*15:02", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "extensive metabolizer"}},"output":"classification" },
  {"input":{"HLA-B":{"diplotype": "*1/*1", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "extensive metabolizer"}},"output":"content" },
  {"input":{"HLA-B":{"diplotype": "*1/*15:02", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "intermediate metabolizer"}},"output":"classification" },
  {"input":{"HLA-B":{"diplotype": "*1/*1", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "intermediate metabolizer"}},"output":"content" },
  {"input":{"HLA-B":{"diplotype": "*1/*15:02", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "poor metabolizer"}},"output":"classification" },
  {"input":{"HLA-B":{"diplotype": "*1/*1", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "poor metabolizer"}},"output":"content" },

]

describe('99999-fk4qz3fz89 v0.0.1', function () {

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
      assert.equal('Incorrect/invalid input for drug Phenytoin', result);
    })

    it('missing diplotype', function(){
      var result = dosingrecommendation({"HLA-B":{"diplotype": "", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": "poor metabolizer"}})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('missing phenotype', function(){
      var result = dosingrecommendation({"HLA-B":{"diplotype": "*1/*1", "phenotype":""}, "CYP2C9": {"diplotype": "", "phenotype": ""}})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal('Incorrect/invalid input for drug Phenytoin', result);
    })

  });

});
