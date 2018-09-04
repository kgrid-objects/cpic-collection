var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk49z9gr7p/v0.0.5/model/resource/getphenotype');

//Load in the function
var getphenotype = javascript.__get__("getphenotype");

var testset = [
  {"input":{"CYP2D6":"*3/*3","CYP2C19":"*3/*3"},"output":"Poor metabolizer" }
]

describe('Poor metabolizer', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.output, function(){
        var result = getphenotype(e.input)
        assert.equal(result.CYP2D6,e.output);
      });

    })


  });


});
