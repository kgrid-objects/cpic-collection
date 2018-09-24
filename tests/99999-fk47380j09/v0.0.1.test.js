var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk47380j09/v0.0.1/model/resource/phenotype');
//var javascript = rewire('../../scripts/payload.js');

//Load in the function
var phenotype = javascript.__get__("phenotype");
var gene='SLCO1B1'
var testset = [
  // {"input":{"enzyme":"CYP2D6","allele1": "*1",  "allele2": "*98"},"output":"TBD" },
  // {"input":{"enzyme":"CYP2D6","allele1": "*1x2",  "allele2": "*41"},"output":"Ultrarapid metabolizer" },
  {"input":{"SLCO1B1":"*1A/*1A"},"output":"Normal function" },
    {"input":{"SLCO1B1":"*5/*13"},"output":"TBD" },
      {"input":{"SLCO1B1":"*1A/*5"},"output":"Intermediate function" },
        {"input":{"SLCO1B1":"*5/*5"},"output":"Low function" },
]

describe('99999-fk47380j09/v0.0.1', function () {

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
