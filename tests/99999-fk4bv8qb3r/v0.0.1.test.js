var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../collection/99999-fk4bv8qb3r/v0.0.1/model/resource/phenotype');
//var javascript = rewire('../../scripts/payload.js');

//Load in the function
var phenotype = javascript.__get__("phenotype");
var gene='CYP2C9'
var testset = [
  // {"input":{"enzyme":"CYP2D6","allele1": "*1",  "allele2": "*98"},"output":"TBD" },
  // {"input":{"enzyme":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"CYP2C9":"*1/*1"},"output":"Extensive metabolizer" },
    {"input":{"CYP2C9":"*1/*7"},"output":"TBD" },
      {"input":{"CYP2C9":"*1/*3"},"output":"Intermediate metabolizer" },
        {"input":{"CYP2C9":"*3/*3"},"output":"Poor metabolizer" },
]

describe('99999-fk4bv8qb3r/v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = phenotype(e.input)
        assert.equal(e.output, result[gene].phenotype);
      });

    })


  });

  // describe('Invalid inputs', function(){
  //
  //   it('fields missing', function(){
  //     var result = phenotype({})
  //     assert.equal('Invalid Input', result);
  //   })
  //
  //   it('incorrect enzyme', function(){
  //     var result = phenotype({"CYP3C5":"*1/*2"})
  //     assert.equal(true, result.startsWith('Expecting'));
  //   })
  //
  //
  //   it('no input', function(){
  //     var result = phenotype()
  //     assert.equal('Error', result);
  //   })
  //
  // });

});
